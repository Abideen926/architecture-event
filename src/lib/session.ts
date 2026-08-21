import "server-only";
import { cookies } from "next/headers";
import { decodeJwt } from "jose";

const SESSION_COOKIE_NAME = "ae_session";
const RESET_COOKIE_NAME = "ae_reset_token";

function expiryFromToken(token: string): Date | undefined {
  try {
    const claims = decodeJwt(token);
    return typeof claims.exp === "number" ? new Date(claims.exp * 1000) : undefined;
  } catch {
    return undefined;
  }
}

const baseCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

export async function setSessionCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    ...baseCookieOptions,
    expires: expiryFromToken(token),
  });
}

export async function getSessionToken() {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE_NAME)?.value;
}

export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function setResetTokenCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(RESET_COOKIE_NAME, token, {
    ...baseCookieOptions,
    expires: expiryFromToken(token),
  });
}

export async function getResetToken() {
  const cookieStore = await cookies();
  return cookieStore.get(RESET_COOKIE_NAME)?.value;
}

export async function clearResetTokenCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(RESET_COOKIE_NAME);
}
