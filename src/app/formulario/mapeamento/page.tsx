import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import { z } from "zod";
import Link from "next/link";

const schema = z.object({
  fullName: z.string().min(3),
  registrationNumber: z.string().min(1),
  department: z.string().min(2),
  currentRole: z.string().min(2),
  serviceTimeRange: z.enum([
    "LESS_THAN_1_YEAR",
    "ONE_TO_THREE_YEARS",
    "THREE_TO_FIVE_YEARS",
    "FIVE_TO_TEN_YEARS",
    "MORE_THAN_TEN_YEARS",
  ]),
  institutionalEmail: z.string().email(),
  phone: z.string().min(6),
  primaryEducation: z.string().min(2),
  otherEducation: z.string().optional(),
  techSkill1: z.string().min(2),
  techSkill2: z.string().min(2),
  techSkill3: z.string().min(2),
  softSkill1: z.string().min(2),
  softSkill2: z.string().min(2),
  softSkill3: z.string().min(2),
  satisfaction: z.enum(["ONE", "TWO", "THREE", "FOUR", "FIVE"]),
  routinePositives: z.string().optional(),
  improvementPoints: z.string().optional(),
  collaborationSuggestions: z.string().optional(),
  representativeStatus: z.enum(["YES", "NO", "NOT_APPLICABLE"]),
  projectFollowupChallenges: z.string().optional(),
  affinityGroups: z.array(z.string()).default([]),
  additionalNotes: z.string().optional(),
});

async function submitAction(formData: FormData) {
  "use server";

  const affinityGroups = formData.getAll("affinityGroups").map(String);

  const parsed = schema.safeParse({
    fullName: formData.get("fullName"),
    registrationNumber: formData.get("registrationNumber"),
    department: formData.get("department"),
    currentRole: formData.get("currentRole"),
    serviceTimeRange: formData.get("serviceTimeRange"),
    institutionalEmail: formData.get("institutionalEmail"),
    phone: formData.get("phone"),
    primaryEducation: formData.get("primaryEducation"),
    otherEducation: formData.get("otherEducation") || undefined,
    techSkill1: formData.get("techSkill1"),
    techSkill2: formData.get("techSkill2"),
    techSkill3: formData.get("techSkill3"),
    softSkill1: formData.get("softSkill1"),
    softSkill2: formData.get("softSkill2"),
    softSkill3: formData.get("softSkill3"),
    satisfaction: formData.get("satisfaction"),
    routinePositives: formData.get("routinePositives") || undefined,
    improvementPoints: formData.get("improvementPoints") || undefined,
    collaborationSuggestions: formData.get("collaborationSuggestions") || undefined,
    representativeStatus: formData.get("representativeStatus"),
    projectFollowupChallenges: formData.get("projectFollowupChallenges") || undefined,
    affinityGroups,
    additionalNotes: formData.get("additionalNotes") || undefined,
  });

  if (!parsed.success) {
    redirect("/formulario/mapeamento?erro=Dados%20inv%C3%A1lidos");
  }

  await prisma.profileMappingResponse.create({
    data: {
      fullName: parsed.data.fullName,
      registrationNumber: parsed.data.registrationNumber,
      department: parsed.data.department,
      currentRole: parsed.data.currentRole,
      serviceTimeRange: parsed.data.serviceTimeRange,
      institutionalEmail: parsed.data.institutionalEmail,
      phone: parsed.data.phone,
      primaryEducation: parsed.data.primaryEducation,
      otherEducation: parsed.data.otherEducation,
      techSkill1: parsed.data.techSkill1,
      techSkill2: parsed.data.techSkill2,
      techSkill3: parsed.data.techSkill3,
      softSkill1: parsed.data.softSkill1,
      softSkill2: parsed.data.softSkill2,
      softSkill3: parsed.data.softSkill3,
      satisfaction: parsed.data.satisfaction,
      routinePositives: parsed.data.routinePositives,
      improvementPoints: parsed.data.improvementPoints,
      collaborationSuggestions: parsed.data.collaborationSuggestions,
      representativeStatus: parsed.data.representativeStatus,
      projectFollowupChallenges: parsed.data.projectFollowupChallenges,
      affinityGroups: parsed.data.affinityGroups.join(","),
      additionalNotes: parsed.data.additionalNotes,
    },
  });

  redirect("/formulario/mapeamento?enviado=ok");
}

export default async function MapeamentoPerfilPage({
  searchParams,
}: {
  searchParams: Promise<{ enviado?: string; erro?: string }>;
}) {
  const { enviado, erro } = await searchParams;

  return (
    <div className="container page">
      <div className="card card-lg" data-reveal>
        <div className="row-between">
          <div>
            <h1 className="hero-title" style={{ fontSize: 30 }}>
              Mapeamento de Perfil
            </h1>
            <p className="muted" style={{ margin: "12px 0 0", lineHeight: 1.65 }}>
              Prezado(a) servidor(a), este questionário tem como objetivo principal
              conhecer melhor o seu perfil para atuação nos órgãos e autarquias da
              prefeitura. Sua participação é voluntária, confidencial e
              fundamental para nos ajudar a identificar talentos, fortalecer
              nossas equipes e otimizar a gestão pública.
            </p>
            <p className="muted" style={{ margin: "10px 0 0", lineHeight: 1.65 }}>
              Por favor, responda às questões com atenção. Agradecemos sua
              colaboração.
            </p>
          </div>
          <Link className="btn btn-ghost btn-sm" href="/">
            Voltar
          </Link>
        </div>

        {enviado === "ok" ? (
          <div className="alert alert--success" style={{ marginTop: 24 }}>
            Resposta enviada com sucesso. Obrigado!
          </div>
        ) : null}

        {erro ? (
          <div className="alert alert--danger" style={{ marginTop: 24 }}>
            {erro}
          </div>
        ) : null}
      </div>

      <form
        action={submitAction}
        className="card card-lg"
        style={{ marginTop: 28 }}
        data-reveal
        data-reveal-delay="60"
      >
        <h2 className="card-title">Seção 1: Identificação do Servidor</h2>

        <div className="grid-2" style={{ marginTop: 18 }}>
          <div className="field-group">
            <label htmlFor="fullName">Nome completo</label>
            <input className="field" id="fullName" name="fullName" required />
          </div>
          <div className="field-group">
            <label htmlFor="registrationNumber">Matrícula</label>
            <input
              className="field"
              id="registrationNumber"
              name="registrationNumber"
              required
            />
          </div>
        </div>

        <div className="grid-2" style={{ marginTop: 18 }}>
          <div className="field-group">
            <label htmlFor="department">Secretaria/Autarquia de lotação</label>
            <input className="field" id="department" name="department" required />
          </div>
          <div className="field-group">
            <label htmlFor="currentRole">Cargo/Função atual</label>
            <input className="field" id="currentRole" name="currentRole" required />
          </div>
        </div>

        <div className="grid-2" style={{ marginTop: 18 }}>
          <div className="field-group">
            <label htmlFor="serviceTimeRange">Tempo de serviço na prefeitura</label>
            <select
              className="field"
              id="serviceTimeRange"
              name="serviceTimeRange"
              required
            >
              <option value="LESS_THAN_1_YEAR">Menos de 1 ano</option>
              <option value="ONE_TO_THREE_YEARS">1 a 3 anos</option>
              <option value="THREE_TO_FIVE_YEARS">3 a 5 anos</option>
              <option value="FIVE_TO_TEN_YEARS">5 a 10 anos</option>
              <option value="MORE_THAN_TEN_YEARS">Mais de 10 anos</option>
            </select>
          </div>
          <div className="field-group">
            <label htmlFor="institutionalEmail">E-mail institucional</label>
            <input
              className="field"
              id="institutionalEmail"
              name="institutionalEmail"
              type="email"
              required
            />
          </div>
        </div>

        <div className="field-group" style={{ marginTop: 18 }}>
          <label htmlFor="phone">Telefone para contato (ramal ou celular)</label>
          <input className="field" id="phone" name="phone" required />
        </div>

        <h2 className="card-title" style={{ marginTop: 26 }}>
          Seção 2: Perfil Profissional e Competências
        </h2>

        <div className="grid-2" style={{ marginTop: 18 }}>
          <div className="field-group">
            <label htmlFor="primaryEducation">Formação acadêmica principal</label>
            <input
              className="field"
              id="primaryEducation"
              name="primaryEducation"
              required
            />
          </div>
          <div className="field-group">
            <label htmlFor="otherEducation">
              Outras formações, cursos ou certificações relevantes
            </label>
            <input className="field" id="otherEducation" name="otherEducation" />
          </div>
        </div>

        <div className="grid-3" style={{ marginTop: 18 }}>
          <div className="field-group">
            <label htmlFor="techSkill1">Competência técnica 1</label>
            <input className="field" id="techSkill1" name="techSkill1" required />
          </div>
          <div className="field-group">
            <label htmlFor="techSkill2">Competência técnica 2</label>
            <input className="field" id="techSkill2" name="techSkill2" required />
          </div>
          <div className="field-group">
            <label htmlFor="techSkill3">Competência técnica 3</label>
            <input className="field" id="techSkill3" name="techSkill3" required />
          </div>
        </div>

        <div className="grid-3" style={{ marginTop: 18 }}>
          <div className="field-group">
            <label htmlFor="softSkill1">Soft skill 1</label>
            <input className="field" id="softSkill1" name="softSkill1" required />
          </div>
          <div className="field-group">
            <label htmlFor="softSkill2">Soft skill 2</label>
            <input className="field" id="softSkill2" name="softSkill2" required />
          </div>
          <div className="field-group">
            <label htmlFor="softSkill3">Soft skill 3</label>
            <input className="field" id="softSkill3" name="softSkill3" required />
          </div>
        </div>

        <h2 className="card-title" style={{ marginTop: 26 }}>
          Seção 3: Percepção e Engajamento
        </h2>

        <div className="field-group" style={{ marginTop: 18 }}>
          <label htmlFor="satisfaction">
            Nível de satisfação em trabalhar na prefeitura (1 a 5)
          </label>
          <select className="field" id="satisfaction" name="satisfaction" required>
            <option value="ONE">1 (Muito insatisfeito)</option>
            <option value="TWO">2</option>
            <option value="THREE">3</option>
            <option value="FOUR">4</option>
            <option value="FIVE">5 (Muito satisfeito)</option>
          </select>
        </div>

        <div className="field-group" style={{ marginTop: 18 }}>
          <label htmlFor="routinePositives">
            Pontos mais positivos na rotina de trabalho
          </label>
          <textarea className="textarea" id="routinePositives" name="routinePositives" />
        </div>

        <div className="field-group" style={{ marginTop: 18 }}>
          <label htmlFor="improvementPoints">
            Principais desafios ou pontos a serem melhorados
          </label>
          <textarea className="textarea" id="improvementPoints" name="improvementPoints" />
        </div>

        <div className="field-group" style={{ marginTop: 18 }}>
          <label htmlFor="collaborationSuggestions">
            Sugestões para aprimorar a colaboração entre secretarias
          </label>
          <textarea
            className="textarea"
            id="collaborationSuggestions"
            name="collaborationSuggestions"
          />
        </div>

        <h2 className="card-title" style={{ marginTop: 26 }}>
          Seção 4: Acompanhamento de Projetos Institucionais
        </h2>

        <div className="field-group" style={{ marginTop: 18 }}>
          <label htmlFor="representativeStatus">
            Designação formal como representante para acompanhamento de projetos
          </label>
          <select
            className="field"
            id="representativeStatus"
            name="representativeStatus"
            required
          >
            <option value="YES">Sim</option>
            <option value="NO">Não</option>
            <option value="NOT_APPLICABLE">Não se aplica</option>
          </select>
        </div>

        <div className="field-group" style={{ marginTop: 18 }}>
          <label htmlFor="projectFollowupChallenges">
            Maiores desafios no processo de acompanhamento de projetos
          </label>
          <textarea
            className="textarea"
            id="projectFollowupChallenges"
            name="projectFollowupChallenges"
          />
        </div>

        <h2 className="card-title" style={{ marginTop: 26 }}>
          Seção 5: Grupos de Afinidade e Encerramento
        </h2>

        <fieldset className="card" style={{ marginTop: 18, padding: 18 }}>
          <legend className="pill" style={{ marginLeft: 6 }}>
            Grupos de afinidade que você se julga capaz de contribuir
          </legend>
          <div className="stack" style={{ marginTop: 12, gap: 10 }}>
            {[
              "Governo Digital e Dados",
              "Comunicação e Engajamento Cidadão",
              "Sustentabilidade e ESG",
              "Saúde Digital e Humanizada",
              "Educação e Transformação Digital",
              "Gestão, Planejamento e Resultados",
              "Atendimento e Experiência do Servidor e do Cidadão",
            ].map((label) => (
              <label
                key={label}
                style={{ display: "flex", gap: 10, alignItems: "center" }}
              >
                <input name="affinityGroups" type="checkbox" value={label} />
                <span className="muted">{label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="field-group" style={{ marginTop: 18 }}>
          <label htmlFor="additionalNotes">
            Há algo mais que você gostaria de adicionar?
          </label>
          <textarea className="textarea" id="additionalNotes" name="additionalNotes" />
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 22 }}>
          <button className="btn btn-primary" type="submit">
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
}
