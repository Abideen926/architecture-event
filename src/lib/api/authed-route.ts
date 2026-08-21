import "server-only";
import { NextResponse } from "next/server";
import { getSessionToken } from "@/lib/session";
import { backendFetch } from "@/lib/api/backend";
import type { BackendEnvelope } from "@/lib/api/backend";

type BackendFetchOptions = Parameters<typeof backendFetch>[1];

/**
 * Same as backendFetch, but reads the session cookie and attaches it as the
 * Authorization header — used by every Route Handler that proxies to an
 * authenticated Express endpoint (organizer/attendee/admin).
 */
export async function authedBackendFetch<T = unknown>(
  path: string,
  options: BackendFetchOptions = {}
): Promise<{ status: number; payload: BackendEnvelope<T> }> {
  const token = await getSessionToken();

  if (!token) {
    return {
      status: 401,
      payload: {
        success: false,
        statusCode: 401,
        message: "Not authenticated",
        data: null,
      },
    };
  }

  return backendFetch<T>(path, { ...options, token });
}

/**
 * Same as backendFetch, but attaches the session cookie's token when present
 * without requiring one — for endpoints where identity is optional (e.g.
 * public event registration-click tracking).
 */
export async function optionalAuthedBackendFetch<T = unknown>(
  path: string,
  options: BackendFetchOptions = {}
) {
  const token = await getSessionToken();
  return backendFetch<T>(path, { ...options, token });
}

export function jsonResult(result: { status: number; payload: unknown }) {
  return NextResponse.json(result.payload, { status: result.status });
}

export function forwardedSearchParams(request: Request) {
  const url = new URL(request.url);
  const params: Record<string, string> = {};
  url.searchParams.forEach((value, key) => {
    params[key] = value;
  });
  return params;
}
