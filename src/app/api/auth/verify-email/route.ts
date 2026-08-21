import { NextResponse } from "next/server";
import { backendFetch } from "@/lib/api/backend";
import { setSessionCookie } from "@/lib/session";

type VerifyEmailData = { user: unknown; accessToken: string };

export async function POST(request: Request) {
  const body = await request.json();
  const result = await backendFetch<VerifyEmailData>("/auth/verify-email", {
    method: "POST",
    body,
  });

  if (result.payload.success && result.payload.data?.accessToken) {
    await setSessionCookie(result.payload.data.accessToken);
  }

  // The access token lives only in the httpOnly cookie — never echo it back
  // into a response body the browser's JS can read.
  return NextResponse.json(
    {
      ...result.payload,
      data: result.payload.data ? { user: result.payload.data.user } : result.payload.data,
    },
    { status: result.status }
  );
}
