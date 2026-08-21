import { authedBackendFetch, jsonResult } from "@/lib/api/authed-route";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json().catch(() => ({}));
  return jsonResult(
    await authedBackendFetch(`/organizer/events/${id}/submit`, { method: "POST", body })
  );
}
