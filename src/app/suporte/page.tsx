import Link from "next/link";

export default function SuportePage() {
  return (
    <div className="container page">
      <div className="card card-lg" data-reveal>
        <h1 className="hero-title" style={{ fontSize: 28 }}>
          Suporte
        </h1>
        <p className="muted" style={{ margin: "12px 0 0", maxWidth: "60rem" }}>
            O suporte será organizado em duas camadas: atendimento geral do site
            (FAQ, central de ajuda e contato) e suporte específico do
            conteudista (diretrizes, padrões e abertura de chamados).
        </p>

        <div className="grid-3" style={{ marginTop: 32 }}>
          <div className="card" data-reveal data-reveal-delay="40">
            <h2 className="card-title">FAQ</h2>
            <p className="muted-2" style={{ margin: "8px 0 0" }}>
                Perguntas frequentes sobre cursos, trilhas e acesso.
            </p>
            <div style={{ marginTop: 14 }}>
              <Link className="text-link" href="/em-breve?titulo=FAQ">
                Ver FAQ
              </Link>
            </div>
          </div>

          <div className="card" data-reveal data-reveal-delay="80">
            <h2 className="card-title">Central de Ajuda</h2>
            <p className="muted-2" style={{ margin: "8px 0 0" }}>
                Artigos, guias e documentação para usuários e conteudistas.
            </p>
            <div style={{ marginTop: 14 }}>
              <Link
                className="text-link"
                href="/em-breve?titulo=Central%20de%20Ajuda"
              >
                Abrir central
              </Link>
            </div>
          </div>

          <div className="card" data-reveal data-reveal-delay="120">
            <h2 className="card-title">Contato</h2>
            <p className="muted-2" style={{ margin: "8px 0 0" }}>
                Canal de atendimento e suporte técnico (WhatsApp/e-mail).
            </p>
            <div style={{ marginTop: 14 }}>
              <Link className="text-link" href="/em-breve?titulo=Contato">
                Ver opções
              </Link>
            </div>
          </div>
        </div>

        <div className="hero-actions" style={{ marginTop: 40 }}>
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
