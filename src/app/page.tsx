import Link from "next/link";
import type { CSSProperties } from "react";

export default function Home() {
  return (
    <div>
      <header className="site-header">
        <div className="container">
          <div className="header-row">
            <div className="brand">
              <span className="brand-title">RPD Academy</span>
              <span className="brand-subtitle">
                Treinamento com performance e dados
              </span>
            </div>

            <div className="header-actions">
              <details className="nav-mobile">
                <summary className="btn btn-ghost btn-sm">Menu</summary>
                <div className="menu-panel">
                  <div className="menu-grid">
                      <a className="nav-link nav-link--panel" href="#hero">
                        Início
                      </a>
                      <a className="nav-link nav-link--panel" href="#para-quem">
                        Para quem é
                      </a>
                      <a className="nav-link nav-link--panel" href="#como-funciona">
                        Como funciona
                      </a>
                      <a className="nav-link nav-link--panel" href="#plataforma">
                        Plataforma
                      </a>
                      <a className="nav-link nav-link--panel" href="#depoimentos">
                        Depoimentos
                      </a>
                      <a className="nav-link nav-link--panel" href="#cta">
                        Falar com a RPD
                      </a>
                  </div>
                </div>
              </details>

              <div className="nav-desktop">
                <a className="nav-link" href="#para-quem">
                  Para quem é
                </a>
                <a className="nav-link" href="#como-funciona">
                  Como funciona
                </a>
                <a className="nav-link" href="#plataforma">
                  Plataforma
                </a>
                <a className="nav-link" href="#depoimentos">
                  Depoimentos
                </a>
                <a className="nav-link" href="#cta">
                  Contato
                </a>
              </div>

              <Link className="btn btn-ghost btn-sm" href="/formulario/mapeamento">
                Mapeamento de Perfil
              </Link>
              <Link className="btn btn-primary btn-sm" href="/conteudista/login">
                Área do Conteudista
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="container page">
        <section id="hero" className="hero" data-reveal>
          <div>
            <span className="eyebrow">Treinamento orientado a resultado</span>
            <h1 className="hero-title">
              Capacitação que vira performance, com indicadores e execução
            </h1>
            <p className="hero-subtitle">
              Para empresas, prefeituras e conteudistas: trilhas, conteúdos e
              gestão em um ecossistema dark, moderno e pronto para crescer com
              integrações via API.
            </p>

            <div className="bar" aria-hidden="true" style={{ marginTop: 18 }}>
              <span />
            </div>

            <div className="hero-actions">
              <Link className="btn btn-primary" href="/suporte">
                Quero uma proposta
              </Link>
              <Link className="btn btn-ghost" href="/formulario/mapeamento">
                Fazer mapeamento
              </Link>
              <Link className="btn btn-ghost" href="/conteudista/login">
                Entrar como conteudista
              </Link>
            </div>

            <div className="stats" data-reveal data-reveal-delay="80">
              <div className="stat">
                <div className="stat-number">21 anos</div>
                <div className="stat-label">de experiência em capacitação</div>
              </div>
              <div className="stat">
                <div className="stat-number">+500</div>
                <div className="stat-label">organizações atendidas</div>
              </div>
              <div className="stat">
                <div className="stat-number">98%</div>
                <div className="stat-label">de satisfação em programas</div>
              </div>
            </div>
          </div>

          <div className="card card-lg" data-reveal data-reveal-delay="80">
            <h2 className="card-title">Proposta de valor</h2>
            <p className="muted-2" style={{ margin: "10px 0 0", lineHeight: 1.7 }}>
              Conecte conteúdo, trilhas e acompanhamento em um único fluxo: do
              diagnóstico à entrega, com evidência de evolução e impacto.
            </p>

            <div className="stack" style={{ marginTop: 16 }}>
              <span className="pill">Trilhas por objetivo</span>
              <span className="pill">Gestão de conteudistas</span>
              <span className="pill">Uploads e materiais</span>
              <span className="pill">Formulários digitais</span>
              <span className="pill">Integração via API</span>
            </div>

            <div
              className="file-row"
              style={{ marginTop: 18, justifyContent: "flex-start" }}
            >
              <Link className="btn btn-primary btn-sm" href="/suporte">
                Agendar conversa
              </Link>
              <a className="btn btn-ghost btn-sm" href="#plataforma">
                Ver a plataforma
              </a>
            </div>
          </div>
        </section>

        <section id="para-quem" className="section">
          <div className="section-head" data-reveal>
            <div>
              <span className="eyebrow">Para quem é</span>
              <h2 className="hero-title" style={{ fontSize: 28, marginTop: 10 }}>
                Uma proposta específica para cada público
              </h2>
              <p className="muted" style={{ margin: "10px 0 0", maxWidth: 780 }}>
                Copy direta, CTA claro e um caminho sem atrito para iniciar:
                proposta, mapeamento ou acesso à área do conteudista.
              </p>
            </div>
          </div>

          <div className="grid-3" style={{ marginTop: 22 }}>
            <div className="card" data-reveal data-reveal-delay="60">
              <h3 className="card-title">Empresas</h3>
              <p
                className="muted-2"
                style={{ margin: "8px 0 0", lineHeight: 1.7 }}
              >
                Treinamento com foco em ROI: trilhas sob medida, liderança e
                evolução mensurável por área.
              </p>
              <div className="stack" style={{ marginTop: 14 }}>
                <span className="pill">T&D Corporativo</span>
                <span className="pill">Liderança</span>
                <span className="pill">ESG / Compliance</span>
              </div>
              <div
                className="file-row"
                style={{ marginTop: 16, justifyContent: "flex-start" }}
              >
                <Link className="btn btn-primary btn-sm" href="/suporte">
                  Quero proposta
                </Link>
                <a className="btn btn-ghost btn-sm" href="#plataforma">
                  Ver métricas
                </a>
              </div>
            </div>

            <div className="card" data-reveal data-reveal-delay="100">
              <h3 className="card-title">Prefeituras</h3>
              <p
                className="muted-2"
                style={{ margin: "8px 0 0", lineHeight: 1.7 }}
              >
                Capacite servidores com trilhas por secretaria e gere dados para
                decisão: satisfação, competências e prioridades.
              </p>
              <div className="stack" style={{ marginTop: 14 }}>
                <span className="pill">Servidores</span>
                <span className="pill">Gestão e Resultados</span>
                <span className="pill">Governo Digital</span>
              </div>
              <div
                className="file-row"
                style={{ marginTop: 16, justifyContent: "flex-start" }}
              >
                <Link className="btn btn-primary btn-sm" href="/formulario/mapeamento">
                  Iniciar mapeamento
                </Link>
                <Link className="btn btn-ghost btn-sm" href="/suporte">
                  Falar agora
                </Link>
              </div>
            </div>

            <div className="card" data-reveal data-reveal-delay="140">
              <h3 className="card-title">Conteudistas</h3>
              <p
                className="muted-2"
                style={{ margin: "8px 0 0", lineHeight: 1.7 }}
              >
                Publique com padrão e velocidade: perfil, cursos, conteúdos e
                uploads em uma área restrita segura.
              </p>
              <div className="stack" style={{ marginTop: 14 }}>
                <span className="pill">Perfil completo</span>
                <span className="pill">Cursos e conteúdos</span>
                <span className="pill">Materiais e imagens</span>
              </div>
              <div
                className="file-row"
                style={{ marginTop: 16, justifyContent: "flex-start" }}
              >
                <Link className="btn btn-primary btn-sm" href="/conteudista/login">
                  Entrar
                </Link>
                <Link className="btn btn-ghost btn-sm" href="/conteudista/cadastro">
                  Criar conta
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section id="como-funciona" className="section">
          <div className="section-head" data-reveal>
            <div>
              <span className="eyebrow">Como funciona</span>
              <h2 className="hero-title" style={{ fontSize: 28, marginTop: 10 }}>
                Diagnóstico → trilhas → entrega → evidência
              </h2>
              <p className="muted" style={{ margin: "10px 0 0", maxWidth: 760 }}>
                Um processo simples, com etapas claras e CTAs em cada passo.
              </p>
            </div>
          </div>

          <div className="grid-2" style={{ marginTop: 22 }}>
            {[
              {
                idx: "01",
                title: "Mapeie o perfil",
                desc: "Colete dados essenciais com questionários digitais e transforme respostas em direcionamento prático.",
                cta: { href: "/formulario/mapeamento", label: "Abrir mapeamento" },
              },
              {
                idx: "02",
                title: "Defina trilhas",
                desc: "Organize conteúdos por objetivo e público, com curadoria e material de apoio para execução.",
                cta: { href: "/suporte", label: "Quero uma trilha" },
              },
              {
                idx: "03",
                title: "Execute com controle",
                desc: "Conteudistas publicam com padrão, e a jornada segue com consistência e governança.",
                cta: { href: "/conteudista/login", label: "Área do conteudista" },
              },
              {
                idx: "04",
                title: "Comprove impacto",
                desc: "Acompanhe indicadores e comunique resultados com métricas simples, visuais e úteis.",
                cta: { href: "/#plataforma", label: "Ver dashboard" },
              },
            ].map((item, index) => (
              <div
                key={item.idx}
                className="step"
                data-reveal
                data-reveal-delay={60 + index * 40}
              >
                <div className="step-top">
                  <div className="step-index">{item.idx}</div>
                  <span className="pill">Etapa</span>
                </div>
                <h3 className="card-title" style={{ marginTop: 14 }}>
                  {item.title}
                </h3>
                <p
                  className="muted-2"
                  style={{ margin: "10px 0 0", lineHeight: 1.7 }}
                >
                  {item.desc}
                </p>
                <div
                  className="file-row"
                  style={{ marginTop: 16, justifyContent: "flex-start" }}
                >
                  <Link className="btn btn-ghost btn-sm" href={item.cta.href}>
                    {item.cta.label}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="plataforma" className="section">
          <div className="section-head" data-reveal>
            <div>
              <span className="eyebrow">Plataforma</span>
              <h2 className="hero-title" style={{ fontSize: 28, marginTop: 10 }}>
                Dashboard com métricas de execução e ROI
              </h2>
              <p className="muted" style={{ margin: "10px 0 0", maxWidth: 780 }}>
                Visual simples, mas com profundidade: acompanhe adesão,
                aprendizagem e retorno com indicadores acionáveis.
              </p>
            </div>
          </div>

          <div className="grid-2" style={{ marginTop: 22 }}>
            <div className="card card-lg dashboard" data-reveal data-reveal-delay="60">
              <div className="row-between">
                <div>
                  <h3 className="card-title">Resumo executivo</h3>
                  <p className="muted-2" style={{ margin: "8px 0 0", lineHeight: 1.7 }}>
                    Um painel para você defender investimento com dados e clareza.
                  </p>
                </div>
                <span className="pill">ROI / Engajamento</span>
              </div>

              <div className="kpi-grid" style={{ marginTop: 16 }}>
                {[
                  { label: "ROI estimado", value: "+24%", to: "82%" },
                  { label: "Engajamento", value: "78%", to: "78%" },
                  { label: "Conclusão", value: "64%", to: "64%" },
                ].map((kpi) => (
                  <div key={kpi.label} className="kpi">
                    <div className="kpi-label">{kpi.label}</div>
                    <div className="kpi-value">{kpi.value}</div>
                    <div className="progress" aria-hidden="true">
                      <span style={{ "--to": kpi.to } as CSSProperties} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="bar" aria-hidden="true" style={{ marginTop: 18 }}>
                <span />
              </div>
            </div>

            <div className="card card-lg" data-reveal data-reveal-delay="100">
              <h3 className="card-title">O que está pronto</h3>
              <ul className="stack muted" style={{ marginTop: 14 }}>
                <li>Área restrita com login para conteudistas</li>
                <li>Perfil com foto, currículo e dados profissionais</li>
                <li>Inserção de cursos, conteúdos e uploads</li>
                <li>Formulários digitais (Mapeamento de Perfil)</li>
                <li>Estrutura preparada para integração via API</li>
              </ul>

              <div
                className="file-row"
                style={{ marginTop: 18, justifyContent: "flex-start" }}
              >
                <Link className="btn btn-primary btn-sm" href="/conteudista/login">
                  Entrar no painel
                </Link>
                <Link className="btn btn-ghost btn-sm" href="/suporte">
                  Falar com especialista
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section id="depoimentos" className="section">
          <div className="section-head" data-reveal>
            <div>
              <span className="eyebrow">Depoimentos</span>
              <h2 className="hero-title" style={{ fontSize: 28, marginTop: 10 }}>
                Confiança construída com entrega
              </h2>
              <p className="muted" style={{ margin: "10px 0 0", maxWidth: 760 }}>
                Um carrossel infinito de evidências (substituível por depoimentos
                reais a qualquer momento).
              </p>
            </div>
          </div>

          <div className="carousel" style={{ marginTop: 22 }} aria-label="Depoimentos">
            <div className="carousel-track carousel-track--slow">
              {[
                {
                  quote:
                    "A mudança foi rápida: trilhas claras e acompanhamento com indicadores que fazem sentido.",
                  name: "Gestão de Pessoas",
                  role: "Empresa parceira",
                },
                {
                  quote:
                    "O mapeamento ajudou a organizar competências e priorizar formação por secretaria.",
                  name: "Gestão Pública",
                  role: "Prefeitura",
                },
                {
                  quote:
                    "Área do conteudista simples, com uploads e organização dos conteúdos sem retrabalho.",
                  name: "Conteudista",
                  role: "Parceiro associado",
                },
                {
                  quote:
                    "O dashboard vira argumento de decisão: dá para defender investimento com clareza.",
                  name: "Diretoria",
                  role: "Organização",
                },
                {
                  quote:
                    "Execução e comunicação melhoraram: cada público tem um caminho direto e objetivo.",
                  name: "Coordenação",
                  role: "Educação e Saúde",
                },
              ]
                .concat([
                  {
                    quote:
                      "A mudança foi rápida: trilhas claras e acompanhamento com indicadores que fazem sentido.",
                    name: "Gestão de Pessoas",
                    role: "Empresa parceira",
                  },
                  {
                    quote:
                      "O mapeamento ajudou a organizar competências e priorizar formação por secretaria.",
                    name: "Gestão Pública",
                    role: "Prefeitura",
                  },
                  {
                    quote:
                      "Área do conteudista simples, com uploads e organização dos conteúdos sem retrabalho.",
                    name: "Conteudista",
                    role: "Parceiro associado",
                  },
                  {
                    quote:
                      "O dashboard vira argumento de decisão: dá para defender investimento com clareza.",
                    name: "Diretoria",
                    role: "Organização",
                  },
                  {
                    quote:
                      "Execução e comunicação melhoraram: cada público tem um caminho direto e objetivo.",
                    name: "Coordenação",
                    role: "Educação e Saúde",
                  },
                ])
                .map((t, idx) => (
                  <div key={`${t.name}-${idx}`} className="testimonial">
                    <p className="testimonial-quote">“{t.quote}”</p>
                    <div className="testimonial-meta">
                      <div className="testimonial-name">{t.name}</div>
                      <div className="testimonial-role">{t.role}</div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>

        <section id="cta" className="section">
          <div className="card card-lg" data-reveal>
            <div className="row-between">
              <div style={{ maxWidth: 760 }}>
                <span className="eyebrow">CTA</span>
                <h2 className="hero-title" style={{ fontSize: 28, marginTop: 10 }}>
                  Vamos transformar dados em entrega real?
                </h2>
                <p className="muted" style={{ margin: "10px 0 0" }}>
                  Escolha um caminho agora: proposta para sua organização,
                  mapeamento do perfil ou acesso ao painel de conteudista.
                </p>
              </div>
              <div className="file-row" style={{ justifyContent: "flex-end" }}>
                <Link className="btn btn-primary" href="/suporte">
                  Falar com a RPD
                </Link>
                <Link className="btn btn-ghost" href="/formulario/mapeamento">
                  Fazer mapeamento
                </Link>
                <Link className="btn btn-ghost" href="/conteudista/login">
                  Área do conteudista
                </Link>
              </div>
            </div>
          </div>
        </section>

        <footer style={{ paddingBottom: 32 }}>
          <div className="grid-3">
            <div className="card" data-reveal data-reveal-delay="40">
              <h3 className="card-title">RPD Academy</h3>
              <p className="muted-2" style={{ margin: "8px 0 0", lineHeight: 1.7 }}>
                Treinamento, trilhas e gestão de conteúdo com foco em conversão,
                execução e evidência.
              </p>
            </div>
            <div className="card" data-reveal data-reveal-delay="80">
              <h3 className="card-title">Atalhos</h3>
              <div className="stack" style={{ marginTop: 10 }}>
                <Link className="nav-link nav-link--panel" href="/formulario/mapeamento">
                  Mapeamento de Perfil
                </Link>
                <Link className="nav-link nav-link--panel" href="/conteudista/login">
                  Área do Conteudista
                </Link>
                <Link className="nav-link nav-link--panel" href="/suporte">
                  Contato / Suporte
                </Link>
              </div>
            </div>
            <div className="card" data-reveal data-reveal-delay="120">
              <h3 className="card-title">Começar agora</h3>
              <p className="muted-2" style={{ margin: "8px 0 0", lineHeight: 1.7 }}>
                Quer acelerar a jornada? Abra o mapeamento e marque uma conversa.
              </p>
              <div className="file-row" style={{ marginTop: 14, justifyContent: "flex-start" }}>
                <Link className="btn btn-primary btn-sm" href="/suporte">
                  Agendar conversa
                </Link>
                <Link className="btn btn-ghost btn-sm" href="/formulario/mapeamento">
                  Responder mapeamento
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </main>

      <a
        className="wa-float"
        href="https://wa.me/?text=Quero%20falar%20com%20a%20RPD%20Academy"
        target="_blank"
        rel="noreferrer"
        aria-label="Falar no WhatsApp"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path
            fill="currentColor"
            d="M20.5 11.9c0 4.67-3.86 8.46-8.62 8.46-1.55 0-3-.39-4.25-1.07L3.5 20.5l1.24-3.82A8.25 8.25 0 0 1 3.3 11.9c0-4.67 3.86-8.46 8.62-8.46 4.76 0 8.58 3.79 8.58 8.46zm-8.62-7.1c-3.96 0-7.18 3.17-7.18 7.1 0 1.4.4 2.7 1.1 3.8l-.72 2.2 2.3-.72a7.2 7.2 0 0 0 3.5.9c3.96 0 7.18-3.17 7.18-7.1 0-3.92-3.22-7.08-7.18-7.08zm4.06 10.04c-.06-.1-.22-.16-.46-.28-.24-.12-1.43-.7-1.65-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1-.37-1.9-1.18-.7-.62-1.17-1.38-1.31-1.62-.14-.24-.02-.37.1-.49.1-.1.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.28-.74-1.76-.2-.48-.4-.4-.54-.4h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.7 2.72 4.2 3.7.58.22 1.04.35 1.4.44.59.15 1.12.13 1.54.08.47-.07 1.43-.58 1.63-1.14.2-.56.2-1.04.14-1.14z"
          />
        </svg>
        WhatsApp
      </a>
    </div>
  );
}
