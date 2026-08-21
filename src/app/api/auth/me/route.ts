import { NextResponse } from "next/server";
import { backendFetch } from "@/lib/api/backend";
import { getSessionToken } from "@/lib/session";

export async function GET() {
  const token = await getSessionToken();

  if (!token) {
    return NextResponse.json(
      { success: false, statusCode: 401, message: "Not authenticated", data: null },
      { status: 401 }
    );
  }

  const result = await backendFetch("/auth/me", { token });
  return NextResponse.json(result.payload, { status: result.status });
}
