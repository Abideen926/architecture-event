import { NextResponse } from "next/server";
import { backendFetch } from "@/lib/api/backend";
import { getResetToken, clearResetTokenCookie } from "@/lib/session";

export async function POST(request: Request) {
  const { newPassword } = await request.json();
  const resetToken = await getResetToken();

  if (!resetToken) {
    return NextResponse.json(
      {
        success: false,
        statusCode: 400,
        message: "Your reset session has expired. Please request a new code.",
        data: null,
      },
      { status: 400 }
    );
  }

  const result = await backendFetch("/auth/reset-password", {
    method: "POST",
    body: { resetToken, newPassword },
  });

  if (result.payload.success) {
    await clearResetTokenCookie();
  }

  return NextResponse.json(result.payload, { status: result.status });
}
