import { getAppSession } from "@/lib/session";
import { LogoutButton } from "@/app/conteudista/LogoutButton";
import Link from "next/link";

export default async function ConteudistaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAppSession();
  if (!session?.user?.id) {
    return children;
  }

  return (
    <div>
      <header className="site-header">
        <div className="container">
          <div className="header-row">
            <div className="brand">
              <Link className="brand-title" href="/">
                Portal RPD
              </Link>
              <span className="brand-subtitle">Área do Conteudista</span>
            </div>

            <div className="header-actions">
              <span className="muted-2 only-desktop" style={{ fontSize: 14 }}>
                {session.user.name || session.user.email}
              </span>
              <LogoutButton />
            </div>
          </div>
        </div>
      </header>

      <div className="container" style={{ paddingTop: 32, paddingBottom: 32 }}>
        <div className="dashboard-layout">
          <nav className="card" style={{ padding: 16 }} data-reveal>
            <details open>
              <summary className="btn btn-ghost btn-sm only-mobile">
                Menu <span className="muted-2" style={{ marginLeft: 8, fontSize: 12 }}>
                  abrir/fechar
                </span>
              </summary>

              <div className="stack" style={{ marginTop: 14 }}>
                <div>
                  <p className="dropdown-title">Dashboard</p>
                  <div className="dropdown-links" style={{ marginTop: 6 }}>
                    <Link className="dropdown-link" href="/conteudista">
                      Painel
                    </Link>
                    <Link className="dropdown-link" href="/conteudista/notificacoes">
                      Notificações
                    </Link>
                  </div>
                </div>

                <div>
                  <p className="dropdown-title">Perfil e Configurações</p>
                  <div className="dropdown-links" style={{ marginTop: 6 }}>
                    <Link className="dropdown-link" href="/conteudista/perfil">
                      Meu perfil
                    </Link>
                    <Link className="dropdown-link" href="/conteudista/configuracoes">
                      Configurações da conta
                    </Link>
                  </div>
                </div>

                <div>
                  <p className="dropdown-title">Gerenciamento de Conteúdo</p>
                  <div className="dropdown-links" style={{ marginTop: 6 }}>
                    <Link className="dropdown-link" href="/conteudista/cursos">
                      Meus cursos e conteúdos
                    </Link>
                    <Link className="dropdown-link" href="/conteudista/cursos">
                      Novo conteúdo
                    </Link>
                    <Link className="dropdown-link" href="/conteudista/templates">
                      Biblioteca de templates
                    </Link>
                  </div>
                </div>

                <div>
                  <p className="dropdown-title">Submissão e Revisão</p>
                  <div className="dropdown-links" style={{ marginTop: 6 }}>
                    <Link className="dropdown-link" href="/conteudista/formulario">
                      Formulário de cadastro
                    </Link>
                    <Link className="dropdown-link" href="/conteudista/revisao">
                      Acompanhamento de revisão
                    </Link>
                  </div>
                </div>

                <div>
                  <p className="dropdown-title">Recursos e Suporte</p>
                  <div className="dropdown-links" style={{ marginTop: 6 }}>
                    <Link className="dropdown-link" href="/conteudista/guias">
                      Guias e documentação
                    </Link>
                    <Link className="dropdown-link" href="/conteudista/ferramentas">
                      Ferramentas de produção
                    </Link>
                    <Link className="dropdown-link" href="/conteudista/suporte">
                      Suporte técnico
                    </Link>
                  </div>
                </div>

                <div>
                  <p className="dropdown-title">Financeiro e Métricas</p>
                  <div className="dropdown-links" style={{ marginTop: 6 }}>
                    <Link className="dropdown-link" href="/conteudista/financeiro">
                      Financeiro
                    </Link>
                    <Link className="dropdown-link" href="/conteudista/metricas">
                      Análise e métricas
                    </Link>
                    <Link className="dropdown-link" href="/conteudista/comunidade">
                      Comunidade
                    </Link>
                  </div>
                </div>
              </div>
            </details>
          </nav>

          <main style={{ minWidth: 0 }}>{children}</main>
        </div>
      </div>
    </div>
  );
}
