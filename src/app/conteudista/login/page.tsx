import { LoginForm } from "@/app/conteudista/login/LoginForm";

export default function LoginConteudistaPage() {
  return (
    <div className="container page">
      <div className="narrow">
        <div className="card card-lg" data-reveal>
          <div style={{ marginBottom: 22 }}>
            <h1 className="hero-title" style={{ fontSize: 30 }}>
              Área do Conteudista
            </h1>
            <p className="muted" style={{ margin: "10px 0 0" }}>
              Faça login para acessar seu painel.
            </p>
          </div>

          <LoginForm />
        </div>
      </div>
    </div>
  );
}
