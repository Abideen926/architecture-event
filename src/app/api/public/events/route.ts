import { NextResponse } from "next/server";
import { backendFetch } from "@/lib/api/backend";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const searchParams: Record<string, string> = {};
  url.searchParams.forEach((value, key) => {
    searchParams[key] = value;
  });

  const result = await backendFetch("/public/events", { searchParams, cache: "no-store" });
  return NextResponse.json(result.payload, { status: result.status });
}
