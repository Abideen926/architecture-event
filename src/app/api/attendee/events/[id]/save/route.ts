import { authedBackendFetch, jsonResult } from "@/lib/api/authed-route";

export async function POST(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return jsonResult(await authedBackendFetch(`/attendee/events/${id}/save`, { method: "POST" }));
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return jsonResult(await authedBackendFetch(`/attendee/events/${id}/save`, { method: "DELETE" }));
}
