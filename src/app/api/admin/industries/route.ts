import { authedBackendFetch, jsonResult } from "@/lib/api/authed-route";

export async function GET() {
  return jsonResult(await authedBackendFetch("/admin/industries"));
}

export async function POST(request: Request) {
  const body = await request.json();
  return jsonResult(await authedBackendFetch("/admin/industries", { method: "POST", body }));
}
