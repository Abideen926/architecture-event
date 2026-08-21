import type { ApiErrorShape } from "./types";

function isApiErrorShape(error: unknown): error is ApiErrorShape {
  return typeof error === "object" && error !== null && "message" in error;
}

// The backend's top-level validation message is deliberately generic
// ("Validation failed") — the useful text lives in errors[]. Don't show the
// generic string in a toast when a specific one is available.
const GENERIC_MESSAGES = new Set(["Validation failed", "Unprocessable entity"]);

export function getApiErrorMessage(
  error: unknown,
  fallback = "Something went wrong. Please try again."
): string {
  if (!isApiErrorShape(error)) return fallback;

  const topMessage = typeof error.message === "string" ? error.message : "";
  const fieldErrors = Array.isArray(error.errors) ? error.errors : [];

  if (topMessage && !GENERIC_MESSAGES.has(topMessage)) {
    return topMessage;
  }

  if (fieldErrors.length > 0 && fieldErrors[0].message) {
    return fieldErrors[0].message;
  }

  return topMessage || fallback;
}

export function getApiFieldErrors(error: unknown): Record<string, string> {
  if (!isApiErrorShape(error) || !Array.isArray(error.errors)) return {};

  const map: Record<string, string> = {};
  for (const item of error.errors) {
    if (!item.field) continue;
    // The backend's validate() middleware prefixes fields with the request
    // part being validated (e.g. "body.endDate", not "endDate") so it can
    // report errors from body/params/query in one list — strip that prefix
    // so callers can key off the plain field name they render in the form.
    const field = item.field.replace(/^(body|params|query)\./, "");
    map[field] = item.message;
  }
  return map;
}
