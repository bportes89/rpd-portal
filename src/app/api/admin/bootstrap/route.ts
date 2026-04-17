import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

type BootstrapBody = {
  email?: string;
  password?: string;
  fullName?: string;
};

export async function POST(req: Request) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  const expectedToken = process.env.BOOTSTRAP_ADMIN_TOKEN;
  const headerToken = req.headers.get("x-bootstrap-token") ?? "";

  if (!expectedToken || headerToken !== expectedToken) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const body = (await req.json().catch(() => ({}))) as BootstrapBody;
  const email = (body.email ?? "").trim().toLowerCase();
  const password = body.password ?? "";
  const fullName = (body.fullName ?? "Administrador").trim();

  if (!email || !password) {
    return NextResponse.json(
      { error: "missing_email_or_password" },
      { status: 400 },
    );
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    const updated = await prisma.user.update({
      where: { email },
      data: { role: "ADMIN" },
      select: { id: true, email: true, role: true },
    });
    return NextResponse.json({ ok: true, user: updated });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const created = await prisma.user.create({
    data: {
      email,
      passwordHash,
      role: "ADMIN",
      profile: {
        create: {
          fullName,
        },
      },
    },
    select: { id: true, email: true, role: true },
  });

  return NextResponse.json({ ok: true, user: created });
}
