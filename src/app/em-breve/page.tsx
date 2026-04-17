import Link from "next/link";

export default async function EmBrevePage({
  searchParams,
}: {
  searchParams: Promise<{ titulo?: string }>;
}) {
  const { titulo } = await searchParams;

  return (
    <div className="container page">
      <div className="card card-lg" data-reveal>
        <span className="pill">Em breve</span>
        <h1 className="hero-title" style={{ fontSize: 30, marginTop: 12 }}>
          {titulo?.trim() ? titulo : "Página em construção"}
        </h1>
        <p className="muted" style={{ margin: "12px 0 0", maxWidth: "48rem" }}>
          Esta área já está prevista na estrutura do menu e será integrada com as
          plataformas externas (EAD/The Members) via API quando necessário.
        </p>

        <div className="hero-actions" style={{ marginTop: 24 }}>
          <Link className="btn btn-primary" href="/">
            Voltar ao início
          </Link>
          <Link className="btn btn-ghost" href="/conteudista/login">
            Área do conteudista
          </Link>
        </div>
      </div>
    </div>
  );
}
