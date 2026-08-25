import { NextResponse } from "next/server";
import { backendFetch } from "@/lib/api/backend";
import { setSessionCookie } from "@/lib/session";

type LoginData =
  | { needsVerification: true; email: string }
  | { user: unknown; accessToken: string };

export async function POST(request: Request) {
  const body = await request.json();
  const result = await backendFetch<LoginData>("/auth/login", { method: "POST", body });

  const data = result.payload.data;

  if (result.payload.success && data && "accessToken" in data) {
    await setSessionCookie(data.accessToken);
  }

  // The access token lives only in the httpOnly cookie — never echo it back
  // into a response body the browser's JS can read.
  return NextResponse.json(
    {
      ...result.payload,
      data: data && "user" in data ? { user: data.user } : data,
    },
    { status: result.status }
  );
}
