import { prisma } from "@/lib/db";
import { getAppSession } from "@/lib/session";
import Link from "next/link";

export default async function ConteudistaHomePage() {
  const session = await getAppSession();
  const userId = session?.user?.id ?? "";

  const [courseCount, contentCount, materialCount] = await Promise.all([
    prisma.course.count({ where: { ownerId: userId } }),
    prisma.content.count({ where: { course: { ownerId: userId } } }),
    prisma.material.count({ where: { content: { course: { ownerId: userId } } } }),
  ]);

  return (
    <div className="stack">
      <div className="card" data-reveal>
        <h1 className="hero-title" style={{ fontSize: 22 }}>
          Painel
        </h1>
        <p className="muted" style={{ margin: "10px 0 0" }}>
          Gerencie seu perfil, cursos e conteúdos.
        </p>
      </div>

      <div className="grid-3">
        <div className="card" data-reveal>
          <p className="muted-2">Cursos</p>
          <p style={{ fontSize: 34, fontWeight: 700, marginTop: 8 }}>
            {courseCount}
          </p>
        </div>
        <div className="card" data-reveal>
          <p className="muted-2">Conteúdos</p>
          <p style={{ fontSize: 34, fontWeight: 700, marginTop: 8 }}>
            {contentCount}
          </p>
        </div>
        <div className="card" data-reveal>
          <p className="muted-2">Materiais</p>
          <p style={{ fontSize: 34, fontWeight: 700, marginTop: 8 }}>
            {materialCount}
          </p>
        </div>
      </div>

      <div className="grid-2">
        <Link className="card card-link" href="/conteudista/perfil" data-reveal>
          <h2 className="section-title">Atualizar meu perfil</h2>
          <p className="muted" style={{ margin: "10px 0 0" }}>
            Foto, currículo e dados profissionais.
          </p>
        </Link>
        <Link className="card card-link" href="/conteudista/cursos" data-reveal>
          <h2 className="section-title">Gerenciar cursos</h2>
          <p className="muted" style={{ margin: "10px 0 0" }}>
            Crie cursos e adicione conteúdos e materiais.
          </p>
        </Link>
      </div>
    </div>
  );
}
