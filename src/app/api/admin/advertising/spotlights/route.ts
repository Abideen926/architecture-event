import { authedBackendFetch, jsonResult } from "@/lib/api/authed-route";

export async function GET() {
  return jsonResult(await authedBackendFetch("/admin/advertising/spotlights"));
}

export async function POST(request: Request) {
  const body = await request.formData();
  return jsonResult(await authedBackendFetch("/admin/advertising/spotlights", { method: "POST", body }));
}
