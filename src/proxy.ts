import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAccessToken, type UserRole } from "@/lib/auth/verify-token";

const ROLE_HOME: Record<UserRole, string> = {
  ATTENDEE: "/attendee",
  ORGANIZER: "/organizer",
  ADMIN: "/admin",
};

const PROTECTED_PREFIXES: Record<string, UserRole> = {
  "/attendee": "ATTENDEE",
  "/organizer": "ORGANIZER",
  "/admin": "ADMIN",
};

const GUEST_ONLY_ROUTES = [
  "/architecture-events/login",
  "/architecture-events/signup",
];

/**
 * Optimistic, cookie-only redirect logic (Next.js "Proxy", formerly
 * Middleware). This never touches the database and is not a security
 * boundary — the Express API's authenticate/authorize middleware remains
 * the final authority. This only exists to avoid a flash of protected UI
 * before a real 401/403 would otherwise surface.
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("ae_session")?.value;
  const session = token ? await verifyAccessToken(token) : null;

  const matchedPrefix = Object.keys(PROTECTED_PREFIXES).find(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );

  if (matchedPrefix) {
    const requiredRole = PROTECTED_PREFIXES[matchedPrefix];

    if (!session) {
      const loginUrl = new URL("/architecture-events/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    if (session.role !== requiredRole) {
      return NextResponse.redirect(new URL(ROLE_HOME[session.role], request.url));
    }
  }

  if (session && GUEST_ONLY_ROUTES.includes(pathname)) {
    return NextResponse.redirect(new URL(ROLE_HOME[session.role], request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images).*)"],
};
