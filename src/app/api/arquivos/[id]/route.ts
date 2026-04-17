import { prisma } from "@/lib/db";
import { getAppSession } from "@/lib/session";
import fs from "fs/promises";

export const runtime = "nodejs";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getAppSession();
  const userId = session?.user?.id;
  if (!userId) {
    return Response.json({ error: "Não autenticado." }, { status: 401 });
  }

  const { id } = await params;

  const asset = await prisma.asset.findUnique({
    where: { id },
    select: { storagePath: true, fileName: true, mimeType: true, ownerId: true },
  });

  if (asset && asset.ownerId === userId) {
    const buf = await fs.readFile(asset.storagePath);
    return new Response(buf, {
      headers: {
        "Content-Type": asset.mimeType || "application/octet-stream",
        "Content-Disposition": `inline; filename="${encodeURIComponent(asset.fileName)}"`,
      },
    });
  }

  const material = await prisma.material.findUnique({
    where: { id },
    select: {
      storagePath: true,
      fileName: true,
      mimeType: true,
      content: { select: { course: { select: { ownerId: true } } } },
    },
  });

  if (!material || material.content.course.ownerId !== userId) {
    return Response.json({ error: "Arquivo não encontrado." }, { status: 404 });
  }

  const buf = await fs.readFile(material.storagePath);
  return new Response(buf, {
    headers: {
      "Content-Type": material.mimeType || "application/octet-stream",
      "Content-Disposition": `attachment; filename="${encodeURIComponent(material.fileName)}"`,
    },
  });
}
