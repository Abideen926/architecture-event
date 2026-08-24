import { authedBackendFetch, jsonResult } from "@/lib/api/authed-route";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.formData();
  return jsonResult(
    await authedBackendFetch(`/admin/advertising/spotlights/${id}`, { method: "PATCH", body })
  );
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return jsonResult(
    await authedBackendFetch(`/admin/advertising/spotlights/${id}`, { method: "DELETE" })
  );
}
