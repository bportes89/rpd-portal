"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

export function LoginForm() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cadastroOk = searchParams.get("cadastro") === "ok";

  return (
    <form
      className="stack"
      onSubmit={async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const email = String(formData.get("email") ?? "")
          .trim()
          .toLowerCase();
        const password = String(formData.get("password") ?? "");

        const result = await signIn("credentials", {
          email,
          password,
          redirect: false,
          callbackUrl: "/conteudista",
        });

        if (result?.ok) {
          window.location.href = result.url || "/conteudista";
          return;
        }

        setError("E-mail ou senha inválidos.");
        setLoading(false);
      }}
    >
      {cadastroOk ? (
        <div className="alert alert--success">
          Cadastro realizado. Faça login para continuar.
        </div>
      ) : null}

      {error ? (
        <div className="alert alert--danger">{error}</div>
      ) : null}

      <div className="field-group">
        <label htmlFor="email">E-mail</label>
        <input
          className="field"
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
        />
      </div>

      <div className="field-group">
        <label htmlFor="password">Senha</label>
        <input
          className="field"
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
        />
      </div>

      <div className="file-row">
        <Link className="text-link" href="/conteudista/cadastro">
          Criar conta
        </Link>

        <button
          className="btn btn-primary"
          disabled={loading}
          type="submit"
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </div>
    </form>
  );
}
