import { NextResponse } from "next/server";
import { backendFetch } from "@/lib/api/backend";
import { setResetTokenCookie } from "@/lib/session";

type VerifyResetOtpData = { resetToken: string };

export async function POST(request: Request) {
  const body = await request.json();
  const result = await backendFetch<VerifyResetOtpData>("/auth/verify-reset-otp", {
    method: "POST",
    body,
  });

  if (result.payload.success && result.payload.data?.resetToken) {
    await setResetTokenCookie(result.payload.data.resetToken);
  }

  // The reset token is a bearer credential — keep it server-side only,
  // never forward it to the browser.
  return NextResponse.json(
    {
      success: result.payload.success,
      statusCode: result.payload.statusCode,
      message: result.payload.message,
      data: result.payload.success ? {} : null,
      errors: result.payload.errors,
    },
    { status: result.status }
  );
}
