import "server-only";

const API_URL = process.env.API_URL;

export type BackendErrorDetail = { field?: string; message: string };

export type BackendEnvelope<T> = {
  success: boolean;
  statusCode: number;
  message: string;
  data: T | null;
  meta?: { page: number; limit: number; total: number; totalPages: number };
  errors?: BackendErrorDetail[];
};

type BackendFetchOptions = {
  method?: "GET" | "POST" | "PATCH" | "DELETE" | "PUT";
  body?: unknown;
  token?: string;
  searchParams?: Record<string, string | number | boolean | undefined>;
  cache?: RequestCache;
};

/**
 * Server-to-server call to the Express API. Never invoked from the browser —
 * every Next.js Route Handler under src/app/api/** proxies through this.
 */
export async function backendFetch<T = unknown>(
  path: string,
  { method = "GET", body, token, searchParams, cache = "no-store" }: BackendFetchOptions = {}
): Promise<{ status: number; payload: BackendEnvelope<T> }> {
  if (!API_URL) {
    throw new Error("API_URL environment variable is not set");
  }

  const url = new URL(`${API_URL}${path}`);

  if (searchParams) {
    for (const [key, value] of Object.entries(searchParams)) {
      if (value !== undefined) url.searchParams.set(key, String(value));
    }
  }

  // FormData (multipart uploads) is passed through untouched — fetch sets
  // its own Content-Type with the correct boundary; JSON bodies keep the
  // existing stringify behavior.
  const isFormData = body instanceof FormData;
  const headers: HeadersInit = isFormData ? {} : { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  let response: Response;

  try {
    response = await fetch(url, {
      method,
      headers,
      body: isFormData ? body : body !== undefined ? JSON.stringify(body) : undefined,
      cache,
    });
  } catch {
    return {
      status: 503,
      payload: {
        success: false,
        statusCode: 503,
        message: "Unable to reach the server. Please try again shortly.",
        data: null,
      },
    };
  }

  const payload = (await response.json().catch(() => null)) as BackendEnvelope<T> | null;

  if (!payload) {
    return {
      status: response.status,
      payload: {
        success: false,
        statusCode: response.status,
        message: "Unexpected response from the server.",
        data: null,
      },
    };
  }

  return { status: response.status, payload };
}
