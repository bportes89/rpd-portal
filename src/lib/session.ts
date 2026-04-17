import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export function getAppSession() {
  return getServerSession(authOptions);
}
