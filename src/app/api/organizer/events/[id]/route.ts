import { authedBackendFetch, jsonResult } from "@/lib/api/authed-route";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return jsonResult(await authedBackendFetch(`/organizer/events/${id}`));
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  return jsonResult(
    await authedBackendFetch(`/organizer/events/${id}`, { method: "PATCH", body })
  );
}
