import { authedBackendFetch, jsonResult } from "@/lib/api/authed-route";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return jsonResult(await authedBackendFetch(`/admin/events/${id}`));
}
