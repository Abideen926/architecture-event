import "server-only";
import { redirect } from "next/navigation";
import { getSessionToken } from "@/lib/session";
import { verifyAccessToken, type UserRole } from "@/lib/auth/verify-token";

/**
 * Server-side Data Access Layer check for role-gated layouts. This runs
 * close to the data (in each protected layout), not just in proxy.ts, per
 * Next.js's recommendation not to rely on Proxy as the only line of defense.
 * Still not the real security boundary — the Express API re-checks on every
 * request regardless of what this returns.
 */
export async function requireRole(role: UserRole) {
  const token = await getSessionToken();
  const session = token ? await verifyAccessToken(token) : null;

  if (!session) {
    redirect(`/architecture-events/login`);
  }

  if (session.role !== role) {
    const home: Record<UserRole, string> = {
      ATTENDEE: "/attendee",
      ORGANIZER: "/organizer",
      ADMIN: "/admin",
    };
    redirect(home[session.role]);
  }

  return session;
}
