import { authedBackendFetch, jsonResult } from "@/lib/api/authed-route";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  return jsonResult(await authedBackendFetch(`/users/${id}/status`, { method: "PATCH", body }));
}
