import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { z } from "zod";
import Link from "next/link";

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  fullName: z.string().min(3),
  professionalId: z.string().optional(),
  organization: z.string().optional(),
  jobTitle: z.string().optional(),
  phone: z.string().optional(),
});

async function registerAction(formData: FormData) {
  "use server";

  const parsed = registerSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    fullName: formData.get("fullName"),
    professionalId: formData.get("professionalId") || undefined,
    organization: formData.get("organization") || undefined,
    jobTitle: formData.get("jobTitle") || undefined,
    phone: formData.get("phone") || undefined,
  });

  if (!parsed.success) {
    redirect("/conteudista/cadastro?erro=Dados%20inv%C3%A1lidos");
  }

  const email = parsed.data.email.trim().toLowerCase();

  const existing = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  });

  if (existing) {
    redirect("/conteudista/cadastro?erro=E-mail%20j%C3%A1%20cadastrado");
  }

  const passwordHash = await bcrypt.hash(parsed.data.password, 12);

  await prisma.user.create({
    data: {
      email,
      passwordHash,
      profile: {
        create: {
          fullName: parsed.data.fullName,
          professionalId: parsed.data.professionalId,
          organization: parsed.data.organization,
          jobTitle: parsed.data.jobTitle,
          phone: parsed.data.phone,
        },
      },
    },
  });

  redirect("/conteudista/login?cadastro=ok");
}

export default async function CadastroConteudistaPage({
  searchParams,
}: {
  searchParams: Promise<{ erro?: string }>;
}) {
  const { erro } = await searchParams;

  return (
    <div className="container page">
      <div className="card card-lg" data-reveal>
        <div style={{ marginBottom: 22 }}>
          <h1 className="hero-title" style={{ fontSize: 30 }}>
            Cadastro de Conteudista
          </h1>
          <p className="muted" style={{ margin: "10px 0 0" }}>
            Crie seu acesso para inserir cursos e conteúdos.
          </p>
          {erro ? (
            <div className="alert alert--danger" style={{ marginTop: 14 }}>
              {erro}
            </div>
          ) : null}
        </div>

        <form action={registerAction} className="stack">
          <div className="field-group">
            <label htmlFor="fullName">Nome completo</label>
            <input className="field" id="fullName" name="fullName" required />
          </div>

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
              autoComplete="new-password"
              minLength={8}
              required
            />
            <span className="muted-2" style={{ fontSize: 12 }}>
              Mínimo de 8 caracteres.
            </span>
          </div>

          <div className="grid-2">
            <div className="field-group">
              <label htmlFor="professionalId">Registro profissional (opcional)</label>
              <input className="field" id="professionalId" name="professionalId" />
            </div>

            <div className="field-group">
              <label htmlFor="phone">Telefone (opcional)</label>
              <input className="field" id="phone" name="phone" />
            </div>
          </div>

          <div className="grid-2">
            <div className="field-group">
              <label htmlFor="organization">Órgão/Empresa (opcional)</label>
              <input className="field" id="organization" name="organization" />
            </div>

            <div className="field-group">
              <label htmlFor="jobTitle">Cargo/Função (opcional)</label>
              <input className="field" id="jobTitle" name="jobTitle" />
            </div>
          </div>

          <div className="file-row">
            <Link className="text-link" href="/conteudista/login">
              Já tenho conta
            </Link>
            <button className="btn btn-primary" type="submit">
              Criar acesso
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
