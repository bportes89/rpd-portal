"use client";

import { signOut } from "next-auth/react";

export function LogoutButton() {
  return (
    <button
      className="btn btn-ghost btn-sm"
      onClick={() => signOut({ callbackUrl: "/" })}
      type="button"
    >
      Sair
    </button>
  );
}
