import { authedBackendFetch, forwardedSearchParams, jsonResult } from "@/lib/api/authed-route";

export async function GET(request: Request) {
  return jsonResult(
    await authedBackendFetch("/organizer/events", { searchParams: forwardedSearchParams(request) })
  );
}

export async function POST(request: Request) {
  const body = await request.json();
  return jsonResult(await authedBackendFetch("/organizer/events", { method: "POST", body }));
}
