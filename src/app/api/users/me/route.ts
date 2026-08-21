import { authedBackendFetch, jsonResult } from "@/lib/api/authed-route";

export async function GET() {
  return jsonResult(await authedBackendFetch("/users/me"));
}

export async function PATCH(request: Request) {
  const body = await request.json();
  return jsonResult(await authedBackendFetch("/users/me", { method: "PATCH", body }));
}
