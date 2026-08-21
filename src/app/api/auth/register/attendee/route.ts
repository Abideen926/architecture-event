import { NextResponse } from "next/server";
import { backendFetch } from "@/lib/api/backend";

export async function POST(request: Request) {
  const body = await request.json();
  const result = await backendFetch("/auth/attendee/register", { method: "POST", body });
  return NextResponse.json(result.payload, { status: result.status });
}
