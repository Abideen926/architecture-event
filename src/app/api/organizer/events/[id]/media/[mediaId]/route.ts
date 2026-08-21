import { authedBackendFetch, jsonResult } from "@/lib/api/authed-route";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string; mediaId: string }> }
) {
  const { id, mediaId } = await params;
  return jsonResult(
    await authedBackendFetch(`/organizer/events/${id}/media/${mediaId}`, { method: "DELETE" })
  );
}
