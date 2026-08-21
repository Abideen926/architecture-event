import { authedBackendFetch, forwardedSearchParams, jsonResult } from "@/lib/api/authed-route";

export async function GET(request: Request) {
  return jsonResult(
    await authedBackendFetch("/attendee/events/saved", {
      searchParams: forwardedSearchParams(request),
    })
  );
}
