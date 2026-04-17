import { prisma } from "@/lib/db";
import { getAppSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { z } from "zod";
import { MaterialUploader } from "@/app/conteudista/cursos/[courseId]/conteudos/[contentId]/MaterialUploader";
import Link from "next/link";

const contentUpdateSchema = z.object({
  title: z.string().min(3),
  body: z.string().optional(),
});

async function updateContentAction(
  courseId: string,
  contentId: string,
  formData: FormData,
) {
  "use server";

  const session = await getAppSession();
  const userId = session?.user?.id;
  if (!userId) redirect("/conteudista/login");

  const parsed = contentUpdateSchema.safeParse({
    title: formData.get("title"),
    body: formData.get("body") || undefined,
  });

  if (!parsed.success) {
    redirect(
      `/conteudista/cursos/${courseId}/conteudos/${contentId}?erro=Dados%20inv%C3%A1lidos`,
    );
  }

  const content = await prisma.content.findFirst({
    where: { id: contentId, courseId, course: { ownerId: userId } },
    select: { id: true },
  });
  if (!content) redirect(`/conteudista/cursos/${courseId}`);

  await prisma.content.update({
    where: { id: content.id },
    data: { title: parsed.data.title, body: parsed.data.body },
  });

  redirect(`/conteudista/cursos/${courseId}/conteudos/${content.id}?salvo=ok`);
}

export default async function ConteudoPage({
  params,
  searchParams,
}: {
  params: Promise<{ courseId: string; contentId: string }>;
  searchParams: Promise<{ salvo?: string; erro?: string }>;
}) {
  const session = await getAppSession();
  const userId = session?.user?.id;
  if (!userId) redirect("/conteudista/login");

  const { courseId, contentId } = await params;
  const { salvo, erro } = await searchParams;

  const content = await prisma.content.findFirst({
    where: { id: contentId, courseId, course: { ownerId: userId } },
    select: {
      id: true,
      title: true,
      body: true,
      course: { select: { id: true, title: true } },
      materials: {
        orderBy: { uploadedAt: "desc" },
        select: { id: true, fileName: true, fileUrl: true, uploadedAt: true },
      },
    },
  });

  if (!content) redirect(`/conteudista/cursos/${courseId}`);

  return (
    <div className="stack">
      <div className="card" data-reveal>
        <div className="row-between">
          <div>
            <p className="muted-2" style={{ fontSize: 12, margin: 0 }}>
              Curso: {content.course.title}
            </p>
            <h1 className="hero-title" style={{ fontSize: 22, marginTop: 6 }}>
              {content.title}
            </h1>
          </div>
          <Link
            className="btn btn-ghost btn-sm"
            href={`/conteudista/cursos/${courseId}`}
          >
            Voltar
          </Link>
        </div>
      </div>

      {salvo === "ok" ? (
        <div className="alert alert--success" data-reveal>
          Conteúdo atualizado com sucesso.
        </div>
      ) : null}

      {erro ? (
        <div className="alert alert--danger" data-reveal>
          {erro}
        </div>
      ) : null}

      <div className="card" data-reveal>
        <h2 className="section-title">Editar conteúdo</h2>
        <form
          action={updateContentAction.bind(null, courseId, content.id)}
          className="stack"
          style={{ marginTop: 14 }}
        >
          <div className="field-group">
            <label htmlFor="title">Título</label>
            <input
              className="field"
              defaultValue={content.title}
              id="title"
              name="title"
              required
            />
          </div>

          <div className="field-group">
            <label htmlFor="body">Texto (opcional)</label>
            <textarea
              className="textarea"
              defaultValue={content.body ?? ""}
              id="body"
              name="body"
            />
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button className="btn btn-primary" type="submit">
              Salvar
            </button>
          </div>
        </form>
      </div>

      <div className="card" data-reveal>
        <h2 className="section-title">Upload de materiais</h2>
        <div style={{ marginTop: 14 }}>
          <MaterialUploader contentId={content.id} />
        </div>
      </div>

      <div className="card" data-reveal>
        <h2 className="section-title">Materiais enviados</h2>
        <div className="stack" style={{ marginTop: 14, gap: 12 }}>
          {content.materials.length ? (
            content.materials.map((m) => (
              <div
                key={m.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 14,
                  borderRadius: 16,
                  border: "1px solid rgba(255,255,255,0.10)",
                  background: "rgba(255,255,255,0.05)",
                  padding: "12px 14px",
                  overflow: "hidden",
                }}
              >
                <div style={{ minWidth: 0 }}>
                  <p className="section-title" style={{ fontSize: 14 }}>
                    {m.fileName}
                  </p>
                  <p className="muted-2" style={{ margin: "6px 0 0", fontSize: 12 }}>
                    Enviado em {new Date(m.uploadedAt).toLocaleDateString("pt-BR")}
                  </p>
                </div>
                <a
                  className="btn btn-ghost btn-sm"
                  href={m.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Baixar
                </a>
              </div>
            ))
          ) : (
            <p className="muted">Nenhum material enviado ainda.</p>
          )}
        </div>
      </div>
    </div>
  );
}
