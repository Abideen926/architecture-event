import { authedBackendFetch, jsonResult } from "@/lib/api/authed-route";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  return jsonResult(await authedBackendFetch(`/admin/events/${id}/reject`, { method: "POST", body }));
}
