import { NextResponse } from "next/server";
import { backendFetch } from "@/lib/api/backend";

export async function GET() {
  const result = await backendFetch("/public/advertising/packages", { cache: "no-store" });
  return NextResponse.json(result.payload, { status: result.status });
}
