import "server-only";
import { jwtVerify } from "jose";

const encodedSecret = new TextEncoder().encode(process.env.JWT_SECRET);
const ISSUER = process.env.JWT_ISSUER || "architectural-events-api";

export type UserRole = "ATTENDEE" | "ORGANIZER" | "ADMIN";

export type AccessTokenPayload = {
  sub: string;
  role: UserRole;
  type: "access";
};

/**
 * Verifies the access token's signature/issuer — mirrors the Express API's
 * own jwt.verify() so proxy.ts / server layouts can make redirect decisions
 * without a network round trip. This is an optimistic UX check only; the
 * Express API remains the sole authority for actual authorization.
 */
export async function verifyAccessToken(token: string): Promise<AccessTokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, encodedSecret, {
      issuer: ISSUER,
      algorithms: ["HS256"],
    });

    if (payload.type !== "access" || typeof payload.sub !== "string") {
      return null;
    }

    const role = payload.role;
    if (role !== "ATTENDEE" && role !== "ORGANIZER" && role !== "ADMIN") {
      return null;
    }

    return { sub: payload.sub, role, type: "access" };
  } catch {
    return null;
  }
}
