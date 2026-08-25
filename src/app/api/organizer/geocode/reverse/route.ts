import { authedBackendFetch, forwardedSearchParams, jsonResult } from "@/lib/api/authed-route";

export async function GET(request: Request) {
  return jsonResult(
    await authedBackendFetch("/organizer/geocode/reverse", {
      searchParams: forwardedSearchParams(request),
    })
  );
}
