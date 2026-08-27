import {
  formatDateInZone,
  formatTimeInZone,
} from "@/features/organizer/datetime";
import type { EventRecord } from "@/features/events/event-types";

export type EventFormState = {
  title: string;
  description: string;
  registrationUrl: string;
  categoryId: string;
  industryId: string;
  isFree: boolean;
  priceFrom: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  isOnline: boolean;
  city: string;
  state: string;
  venueName: string;
  address: string;
  latitude: string;
  longitude: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  internalNotes: string;
};

export function emptyFormState(): EventFormState {
  return {
    title: "",
    description: "",
    registrationUrl: "",
    categoryId: "",
    industryId: "",
    isFree: false,
    priceFrom: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    isOnline: false,
    city: "",
    state: "",
    venueName: "",
    address: "",
    latitude: "",
    longitude: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    internalNotes: "",
  };
}

export function formStateFromEvent(event: EventRecord): EventFormState {
  return {
    title: event.title,
    description: event.description,
    registrationUrl: event.registrationUrl,
    categoryId: event.categoryId,
    industryId: event.industryId ?? "",
    isFree: event.isFree,
    priceFrom: event.priceFromCents
      ? (event.priceFromCents / 100).toFixed(2)
      : "",
    startDate: formatDateInZone(event.startAt, event.timezone),
    startTime: formatTimeInZone(event.startAt, event.timezone),
    endDate: event.endAt ? formatDateInZone(event.endAt, event.timezone) : "",
    endTime: event.endAt ? formatTimeInZone(event.endAt, event.timezone) : "",
    isOnline: event.isOnline,
    city: event.city ?? "",
    state: event.state ?? "",
    venueName: event.venueName ?? "",
    address: event.address ?? "",
    latitude: event.latitude != null ? String(event.latitude) : "",
    longitude: event.longitude != null ? String(event.longitude) : "",
    contactName: event.contactName,
    contactEmail: event.contactEmail,
    contactPhone: event.contactPhone ?? "",
    internalNotes: event.internalNotes ?? "",
  };
}

function isValidUrl(value: string) {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

const EMAIL_RULE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEventForm(form: EventFormState): Record<string, string> {
  const next: Record<string, string> = {};
  if (form.title.trim().length < 3)
    next.title = "Title must be at least 3 characters";
  if (form.description.trim().length < 10)
    next.description = "Description must be at least 10 characters";
  if (!form.registrationUrl.trim()) {
    next.registrationUrl = "Registration URL is required";
  } else if (!isValidUrl(form.registrationUrl.trim())) {
    next.registrationUrl =
      "Enter a valid URL, e.g. https://example.com/register";
  }
  if (!form.categoryId) next.categoryId = "Choose a category";
  if (!form.industryId) next.industryId = "Choose an industry";
  if (!form.isFree && !form.priceFrom)
    next.priceFrom = "Enter a starting price, or mark this event free";
  if (!form.isFree && form.priceFrom && Number(form.priceFrom) <= 0) {
    next.priceFrom = "Price must be greater than 0";
  }
  if (!form.startDate) next.startDate = "Start date is required";
  if (!form.startTime) next.startTime = "Start time is required";

  // Mirrors two separate backend checks: Zod compares dates only (create/update
  // schema), the Event model compares the full date+time instant — so a
  // same-day event with an end time before the start time passes Zod but is
  // rejected at the database layer. Catch both here before submitting.
  if (form.endDate && form.startDate) {
    if (form.endDate < form.startDate) {
      next.endDate = "End date can't be before the start date";
    } else if (
      form.endDate === form.startDate &&
      form.endTime &&
      form.startTime &&
      form.endTime < form.startTime
    ) {
      next.endTime = "End time can't be before the start time on the same day";
    }
  }

  if (!form.isOnline) {
    if (!form.city.trim())
      next.city = "City is required for in-person events";
    if (!form.state.trim())
      next.state = "State is required for in-person events";
  }
  if (form.contactName.trim().length < 2)
    next.contactName = "Contact name is required";
  if (!form.contactEmail.trim()) {
    next.contactEmail = "Contact email is required";
  } else if (!EMAIL_RULE.test(form.contactEmail.trim())) {
    next.contactEmail = "Enter a valid email address";
  }

  return next;
}
