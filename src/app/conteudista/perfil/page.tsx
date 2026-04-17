import { prisma } from "@/lib/db";
import { getAppSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { z } from "zod";
import { PhotoUploader } from "@/app/conteudista/perfil/PhotoUploader";

const profileSchema = z.object({
  fullName: z.string().min(3),
  professionalId: z.string().optional(),
  organization: z.string().optional(),
  jobTitle: z.string().optional(),
  phone: z.string().optional(),
  curriculum: z.string().optional(),
});

async function updateProfileAction(formData: FormData) {
  "use server";

  const session = await getAppSession();
  const userId = session?.user?.id;
  if (!userId) redirect("/conteudista/login");

  const parsed = profileSchema.safeParse({
    fullName: formData.get("fullName"),
    professionalId: formData.get("professionalId") || undefined,
    organization: formData.get("organization") || undefined,
    jobTitle: formData.get("jobTitle") || undefined,
    phone: formData.get("phone") || undefined,
    curriculum: formData.get("curriculum") || undefined,
  });

  if (!parsed.success) {
    redirect("/conteudista/perfil?erro=Dados%20inv%C3%A1lidos");
  }

  await prisma.contentCreatorProfile.update({
    where: { userId },
    data: {
      fullName: parsed.data.fullName,
      professionalId: parsed.data.professionalId,
      organization: parsed.data.organization,
      jobTitle: parsed.data.jobTitle,
      phone: parsed.data.phone,
      curriculum: parsed.data.curriculum,
    },
  });

  redirect("/conteudista/perfil?salvo=ok");
}

export default async function PerfilConteudistaPage({
  searchParams,
}: {
  searchParams: Promise<{ salvo?: string; erro?: string }>;
}) {
  const session = await getAppSession();
  const userId = session?.user?.id;
  if (!userId) redirect("/conteudista/login");

  const profile = await prisma.contentCreatorProfile.findUnique({
    where: { userId },
    select: {
      fullName: true,
      professionalId: true,
      organization: true,
      jobTitle: true,
      phone: true,
      curriculum: true,
      photoUrl: true,
    },
  });

  if (!profile) redirect("/conteudista/cadastro");

  const { salvo, erro } = await searchParams;

  return (
    <div className="stack">
      <div className="card" data-reveal>
        <h1 className="hero-title" style={{ fontSize: 22 }}>
          Meu perfil
        </h1>
        <p className="muted" style={{ margin: "10px 0 0" }}>
          Foto, currículo e dados profissionais.
        </p>
      </div>

      {salvo === "ok" ? (
        <div className="alert alert--success" data-reveal>
          Perfil atualizado com sucesso.
        </div>
      ) : null}

      {erro ? (
        <div className="alert alert--danger" data-reveal>
          {erro}
        </div>
      ) : null}

      <div className="card" data-reveal>
        <PhotoUploader initialUrl={profile.photoUrl} />
      </div>

      <div className="card" data-reveal>
        <form action={updateProfileAction} className="stack">
          <div className="field-group">
            <label htmlFor="fullName">Nome completo</label>
            <input
              className="field"
              defaultValue={profile.fullName}
              id="fullName"
              name="fullName"
              required
            />
          </div>

          <div className="grid-2">
            <div className="field-group">
              <label htmlFor="professionalId">Registro profissional</label>
              <input
                className="field"
                defaultValue={profile.professionalId ?? ""}
                id="professionalId"
                name="professionalId"
              />
            </div>

            <div className="field-group">
              <label htmlFor="phone">Telefone</label>
              <input
                className="field"
                defaultValue={profile.phone ?? ""}
                id="phone"
                name="phone"
              />
            </div>
          </div>

          <div className="grid-2">
            <div className="field-group">
              <label htmlFor="organization">Organização</label>
              <input
                className="field"
                defaultValue={profile.organization ?? ""}
                id="organization"
                name="organization"
              />
            </div>

            <div className="field-group">
              <label htmlFor="jobTitle">Cargo/Função</label>
              <input
                className="field"
                defaultValue={profile.jobTitle ?? ""}
                id="jobTitle"
                name="jobTitle"
              />
            </div>
          </div>

          <div className="field-group">
            <label htmlFor="curriculum">Currículo / mini bio</label>
            <textarea
              className="textarea"
              defaultValue={profile.curriculum ?? ""}
              id="curriculum"
              name="curriculum"
            />
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button className="btn btn-primary" type="submit">
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
