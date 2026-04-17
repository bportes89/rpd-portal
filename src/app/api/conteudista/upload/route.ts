import { prisma } from "@/lib/db";
import { getAppSession } from "@/lib/session";
import { saveUploadedFile } from "@/lib/storage";
import { z } from "zod";

export const runtime = "nodejs";

const uploadSchema = z.object({
  kind: z.enum(["PROFILE_PHOTO", "COURSE_COVER", "MATERIAL"]),
  courseId: z.string().optional(),
  contentId: z.string().optional(),
});

export async function POST(req: Request) {
  const session = await getAppSession();
  const userId = session?.user?.id;

  if (!userId) {
    return Response.json({ error: "Não autenticado." }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return Response.json({ error: "Arquivo ausente." }, { status: 400 });
  }

  const parsed = uploadSchema.safeParse({
    kind: formData.get("kind"),
    courseId: formData.get("courseId") || undefined,
    contentId: formData.get("contentId") || undefined,
  });

  if (!parsed.success) {
    return Response.json({ error: "Parâmetros inválidos." }, { status: 400 });
  }

  const { kind, courseId, contentId } = parsed.data;

  if (kind === "PROFILE_PHOTO") {
    if (!file.type.startsWith("image/")) {
      return Response.json(
        { error: "A foto precisa ser uma imagem." },
        { status: 400 },
      );
    }

    const saved = await saveUploadedFile({
      folder: "profile-photos",
      file,
      maxBytes: 5 * 1024 * 1024,
    });

    const asset = await prisma.asset.create({
      data: {
        ownerId: userId,
        kind: "PROFILE_PHOTO",
        storagePath: saved.storagePath,
        fileName: saved.originalName,
        mimeType: saved.mimeType,
        sizeBytes: saved.sizeBytes,
      },
      select: { id: true },
    });

    const url = `/api/arquivos/${asset.id}`;

    await prisma.contentCreatorProfile.update({
      where: { userId },
      data: { photoUrl: url },
    });

    return Response.json({ id: asset.id, url });
  }

  if (kind === "COURSE_COVER") {
    if (!courseId) {
      return Response.json({ error: "courseId ausente." }, { status: 400 });
    }
    if (!file.type.startsWith("image/")) {
      return Response.json(
        { error: "A capa precisa ser uma imagem." },
        { status: 400 },
      );
    }

    const course = await prisma.course.findFirst({
      where: { id: courseId, ownerId: userId },
      select: { id: true },
    });
    if (!course) {
      return Response.json({ error: "Curso não encontrado." }, { status: 404 });
    }

    const saved = await saveUploadedFile({
      folder: "course-covers",
      file,
      maxBytes: 5 * 1024 * 1024,
    });

    const asset = await prisma.asset.create({
      data: {
        ownerId: userId,
        kind: "COURSE_COVER",
        storagePath: saved.storagePath,
        fileName: saved.originalName,
        mimeType: saved.mimeType,
        sizeBytes: saved.sizeBytes,
      },
      select: { id: true },
    });

    const url = `/api/arquivos/${asset.id}`;

    await prisma.course.update({
      where: { id: course.id },
      data: { coverUrl: url },
    });

    return Response.json({ id: asset.id, url });
  }

  if (!contentId) {
    return Response.json({ error: "contentId ausente." }, { status: 400 });
  }

  const content = await prisma.content.findFirst({
    where: { id: contentId, course: { ownerId: userId } },
    select: { id: true },
  });

  if (!content) {
    return Response.json(
      { error: "Conteúdo não encontrado." },
      { status: 404 },
    );
  }

  const saved = await saveUploadedFile({
    folder: "materials",
    file,
    maxBytes: 10 * 1024 * 1024,
  });

  const material = await prisma.material.create({
    data: {
      contentId: content.id,
      fileUrl: "",
      storagePath: saved.storagePath,
      fileName: saved.originalName,
      mimeType: saved.mimeType,
      sizeBytes: saved.sizeBytes,
    },
    select: { id: true },
  });

  const url = `/api/arquivos/${material.id}`;

  await prisma.material.update({
    where: { id: material.id },
    data: { fileUrl: url },
  });

  return Response.json({ id: material.id, url, fileName: saved.originalName });
}

