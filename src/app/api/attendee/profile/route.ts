import { authedBackendFetch, jsonResult } from "@/lib/api/authed-route";

export async function GET() {
  return jsonResult(await authedBackendFetch("/attendee/profile"));
}

export async function PATCH(request: Request) {
  const body = await request.json();
  return jsonResult(await authedBackendFetch("/attendee/profile", { method: "PATCH", body }));
}
