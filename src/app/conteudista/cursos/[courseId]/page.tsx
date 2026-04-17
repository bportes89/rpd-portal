import { prisma } from "@/lib/db";
import { getAppSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { z } from "zod";
import { CoverUploader } from "@/app/conteudista/cursos/[courseId]/CoverUploader";
import Link from "next/link";

const updateCourseSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
});

const contentSchema = z.object({
  title: z.string().min(3),
});

async function updateCourseAction(courseId: string, formData: FormData) {
  "use server";

  const session = await getAppSession();
  const userId = session?.user?.id;
  if (!userId) redirect("/conteudista/login");

  const parsed = updateCourseSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description") || undefined,
  });

  if (!parsed.success) {
    redirect(`/conteudista/cursos/${courseId}?erro=Dados%20inv%C3%A1lidos`);
  }

  const course = await prisma.course.findFirst({
    where: { id: courseId, ownerId: userId },
    select: { id: true },
  });
  if (!course) redirect("/conteudista/cursos");

  await prisma.course.update({
    where: { id: course.id },
    data: {
      title: parsed.data.title,
      description: parsed.data.description,
    },
  });

  redirect(`/conteudista/cursos/${course.id}?salvo=ok`);
}

async function createContentAction(courseId: string, formData: FormData) {
  "use server";

  const session = await getAppSession();
  const userId = session?.user?.id;
  if (!userId) redirect("/conteudista/login");

  const parsed = contentSchema.safeParse({ title: formData.get("title") });
  if (!parsed.success) {
    redirect(`/conteudista/cursos/${courseId}?erro=Dados%20inv%C3%A1lidos`);
  }

  const course = await prisma.course.findFirst({
    where: { id: courseId, ownerId: userId },
    select: { id: true },
  });
  if (!course) redirect("/conteudista/cursos");

  const content = await prisma.content.create({
    data: {
      courseId: course.id,
      title: parsed.data.title,
    },
    select: { id: true },
  });

  redirect(`/conteudista/cursos/${course.id}/conteudos/${content.id}`);
}

export default async function CursoDetalhePage({
  params,
  searchParams,
}: {
  params: Promise<{ courseId: string }>;
  searchParams: Promise<{ salvo?: string; erro?: string }>;
}) {
  const session = await getAppSession();
  const userId = session?.user?.id;
  if (!userId) redirect("/conteudista/login");

  const { courseId } = await params;
  const { salvo, erro } = await searchParams;

  const course = await prisma.course.findFirst({
    where: { id: courseId, ownerId: userId },
    select: {
      id: true,
      title: true,
      description: true,
      coverUrl: true,
      contents: {
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          title: true,
          updatedAt: true,
          _count: { select: { materials: true } },
        },
      },
    },
  });

  if (!course) redirect("/conteudista/cursos");

  return (
    <div className="stack">
      <div className="card" data-reveal>
        <div className="row-between">
          <div>
            <h1 className="hero-title" style={{ fontSize: 22 }}>
              {course.title}
            </h1>
            <p className="muted" style={{ margin: "10px 0 0" }}>
              Ajuste dados do curso e gerencie os conteúdos.
            </p>
          </div>

          <Link className="btn btn-ghost btn-sm" href="/conteudista/cursos">
            Voltar
          </Link>
        </div>
      </div>

      {salvo === "ok" ? (
        <div className="alert alert--success" data-reveal>
          Curso atualizado com sucesso.
        </div>
      ) : null}

      {erro ? (
        <div className="alert alert--danger" data-reveal>
          {erro}
        </div>
      ) : null}

      <div className="card" data-reveal>
        <CoverUploader courseId={course.id} initialUrl={course.coverUrl} />
      </div>

      <div className="card" data-reveal>
        <h2 className="section-title">Dados do curso</h2>
        <form
          action={updateCourseAction.bind(null, course.id)}
          className="stack"
          style={{ marginTop: 14 }}
        >
          <div className="field-group">
            <label htmlFor="title">Título</label>
            <input
              className="field"
              defaultValue={course.title}
              id="title"
              name="title"
              required
            />
          </div>

          <div className="field-group">
            <label htmlFor="description">Descrição</label>
            <textarea
              className="textarea"
              defaultValue={course.description ?? ""}
              id="description"
              name="description"
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
        <h2 className="section-title">Novo conteúdo</h2>
        <form
          action={createContentAction.bind(null, course.id)}
          className="grid-2"
          style={{ marginTop: 14, alignItems: "end" }}
        >
          <div className="field-group" style={{ minWidth: 0 }}>
            <label htmlFor="newTitle">Título</label>
            <input
              className="field"
              id="newTitle"
              name="title"
              required
            />
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button className="btn btn-primary" type="submit">
            Criar
            </button>
          </div>
        </form>
      </div>

      <div className="stack" style={{ gap: 12 }}>
        {course.contents.length ? (
          course.contents.map((c) => (
            <Link
              key={c.id}
              className="card card-link"
              href={`/conteudista/cursos/${course.id}/conteudos/${c.id}`}
              data-reveal
            >
              <div className="row-between">
                <div>
                  <h3 className="section-title" style={{ fontSize: 14 }}>
                    {c.title}
                  </h3>
                  <p className="muted-2" style={{ margin: "6px 0 0", fontSize: 12 }}>
                    Atualizado em{" "}
                    {new Date(c.updatedAt).toLocaleDateString("pt-BR")}
                  </p>
                </div>
                <span className="pill">
                  {c._count.materials} materiais
                </span>
              </div>
            </Link>
          ))
        ) : (
          <div className="card" data-reveal>
            <p className="muted">Nenhum conteúdo neste curso ainda.</p>
          </div>
        )}
      </div>
    </div>
  );
}
