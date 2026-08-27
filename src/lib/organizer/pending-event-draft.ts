import type { EventFormState } from "@/components/organizer/submit-event/event-form-state";
import type { PackageId } from "@/components/organizer/submit-event/submit-event-types";

const STORAGE_KEY = "ae_pending_event_draft";
const TTL_MS = 24 * 60 * 60 * 1000;

type PendingEventDraft = {
  form: EventFormState;
  packageId: PackageId;
  savedAt: number;
};

// Bridges the public, pre-login submit-event form to the organizer
// dashboard's real wizard across a login redirect — this codebase has no
// server-side draft concept for an unauthenticated visitor, so the filled
// form is held client-side only, with a short TTL so a half-filled form
// can't silently reappear weeks later.
export function savePendingEventDraft(draft: Omit<PendingEventDraft, "savedAt">) {
  if (typeof window === "undefined") return;
  const payload: PendingEventDraft = { ...draft, savedAt: Date.now() };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

export function readPendingEventDraft(): PendingEventDraft | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as PendingEventDraft;
    if (Date.now() - parsed.savedAt > TTL_MS) {
      window.localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return parsed;
  } catch {
    window.localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

export function clearPendingEventDraft() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}
