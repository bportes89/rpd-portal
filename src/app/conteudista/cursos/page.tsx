import { prisma } from "@/lib/db";
import { getAppSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { z } from "zod";
import Link from "next/link";

const courseSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
});

async function createCourseAction(formData: FormData) {
  "use server";

  const session = await getAppSession();
  const userId = session?.user?.id;
  if (!userId) redirect("/conteudista/login");

  const parsed = courseSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description") || undefined,
  });

  if (!parsed.success) {
    redirect("/conteudista/cursos?erro=Dados%20inv%C3%A1lidos");
  }

  const course = await prisma.course.create({
    data: {
      ownerId: userId,
      title: parsed.data.title,
      description: parsed.data.description,
    },
    select: { id: true },
  });

  redirect(`/conteudista/cursos/${course.id}`);
}

export default async function CursosPage({
  searchParams,
}: {
  searchParams: Promise<{ erro?: string }>;
}) {
  const session = await getAppSession();
  const userId = session?.user?.id;
  if (!userId) redirect("/conteudista/login");

  const { erro } = await searchParams;

  const courses = await prisma.course.findMany({
    where: { ownerId: userId },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      description: true,
      coverUrl: true,
      _count: { select: { contents: true } },
    },
  });

  return (
    <div className="stack">
      <div className="card" data-reveal>
        <h1 className="hero-title" style={{ fontSize: 22 }}>
          Cursos
        </h1>
        <p className="muted" style={{ margin: "10px 0 0" }}>
          Crie cursos e organize seus conteúdos.
        </p>
      </div>

      {erro ? (
        <div className="alert alert--danger" data-reveal>
          {erro}
        </div>
      ) : null}

      <div className="card" data-reveal>
        <h2 className="section-title">Novo curso</h2>
        <form
          action={createCourseAction}
          className="stack"
          style={{ marginTop: 14 }}
        >
          <div className="field-group">
            <label htmlFor="title">Título</label>
            <input
              className="field"
              id="title"
              name="title"
              required
            />
          </div>
          <div className="field-group">
            <label htmlFor="description">Descrição</label>
            <textarea
              className="textarea"
              id="description"
              name="description"
            />
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button className="btn btn-primary" type="submit">
              Criar curso
            </button>
          </div>
        </form>
      </div>

      <div className="stack" style={{ gap: 14 }}>
        {courses.length ? (
          courses.map((course) => (
            <Link
              key={course.id}
              className="card card-link"
              href={`/conteudista/cursos/${course.id}`}
              data-reveal
            >
              <div className="row-between">
                <div>
                  <h3 className="section-title" style={{ fontSize: 16 }}>
                    {course.title}
                  </h3>
                  {course.description ? (
                    <p className="muted" style={{ margin: "10px 0 0" }}>
                      {course.description}
                    </p>
                  ) : null}
                </div>
                <span className="pill">
                  {course._count.contents} conteúdos
                </span>
              </div>
            </Link>
          ))
        ) : (
          <div className="card" data-reveal>
            <p className="muted">Nenhum curso cadastrado ainda.</p>
          </div>
        )}
      </div>
    </div>
  );
}
