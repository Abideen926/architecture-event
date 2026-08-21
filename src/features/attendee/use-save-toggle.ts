import { useMemo } from "react";
import { toast } from "sonner";
import { useGetMeQuery } from "@/features/auth/auth-api";
import {
  useListSavedEventsQuery,
  useSaveEventMutation,
  useUnsaveEventMutation,
} from "@/features/attendee/attendee-api";
import { getApiErrorMessage } from "@/lib/store/api-error";

/**
 * Shared "is this event saved, and how do I toggle it" behavior for every
 * Save button in the app (home, browse, event detail). Centralizing this
 * avoids each button guessing its own saved state and keeps the toggle
 * behavior (and its edge cases) consistent everywhere.
 */
export function useSaveToggle() {
  const { data: me } = useGetMeQuery();
  const isAttendee = me?.role === "ATTENDEE";

  const { data: savedEvents } = useListSavedEventsQuery({ limit: 100 }, { skip: !isAttendee });
  const savedEventIds = useMemo(
    () => new Set((savedEvents?.items ?? []).map((item) => item.eventId)),
    [savedEvents]
  );

  const [saveEvent, { isLoading: isSaving }] = useSaveEventMutation();
  const [unsaveEvent, { isLoading: isUnsaving }] = useUnsaveEventMutation();

  function isSaved(eventId: string) {
    return savedEventIds.has(eventId);
  }

  async function toggleSave(eventId: string) {
    if (!me) {
      toast.error("Log in to save events", {
        description: "Create an attendee account to save events for later.",
      });
      return;
    }
    if (!isAttendee) {
      toast.error("Only attendee accounts can save events");
      return;
    }

    if (isSaved(eventId)) {
      try {
        await unsaveEvent(eventId).unwrap();
        toast.success("Removed from saved events");
      } catch (error) {
        toast.error("Couldn't remove event", { description: getApiErrorMessage(error) });
      }
      return;
    }

    try {
      await saveEvent(eventId).unwrap();
      toast.success("Event saved");
    } catch (error) {
      toast.error("Couldn't save event", { description: getApiErrorMessage(error) });
    }
  }

  return { isSaved, toggleSave, isBusy: isSaving || isUnsaving };
}
