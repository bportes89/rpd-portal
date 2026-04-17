import Link from "next/link";

export default async function ConteudistaEmBrevePage({
  searchParams,
}: {
  searchParams: Promise<{ titulo?: string }>;
}) {
  const { titulo } = await searchParams;

  return (
    <div className="stack">
      <div className="card" data-reveal>
        <p className="muted-2" style={{ fontSize: 12, fontWeight: 650, margin: 0 }}>
          Em breve
        </p>
        <h1 className="hero-title" style={{ fontSize: 22, marginTop: 8 }}>
          {titulo?.trim() ? titulo : "Área em construção"}
        </h1>
        <p className="muted" style={{ margin: "12px 0 0", lineHeight: 1.7, maxWidth: 720 }}>
          Esta seção faz parte do fluxo do conteudista e será conectada às
          integrações (EAD/The Members) e ao processo de curadoria conforme o
          modelo definido.
        </p>

        <div className="file-row" style={{ marginTop: 18, justifyContent: "flex-start" }}>
          <Link className="btn btn-primary" href="/conteudista">
            Voltar ao painel
          </Link>
          <Link className="btn btn-ghost" href="/conteudista/cursos">
            Ir para cursos
          </Link>
        </div>
      </div>
    </div>
  );
}
