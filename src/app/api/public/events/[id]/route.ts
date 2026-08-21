import { NextResponse } from "next/server";
import { backendFetch } from "@/lib/api/backend";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const result = await backendFetch(`/public/events/${id}`, { cache: "no-store" });
  return NextResponse.json(result.payload, { status: result.status });
}
