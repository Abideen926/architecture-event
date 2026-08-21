import { authedBackendFetch, jsonResult } from "@/lib/api/authed-route";

export async function GET() {
  return jsonResult(await authedBackendFetch("/admin/categories"));
}

export async function POST(request: Request) {
  const body = await request.json();
  return jsonResult(await authedBackendFetch("/admin/categories", { method: "POST", body }));
}
