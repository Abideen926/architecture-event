export type EventStatus =
  | "DRAFT"
  | "UNDER_REVIEW"
  | "CHANGES_REQUESTED"
  | "PUBLISHED"
  | "REJECTED"
  | "ARCHIVED";

export type EventMediaType = "IMAGE" | "VIDEO";

export type EventMedia = {
  id: string;
  eventId: string;
  resourceType: EventMediaType;
  url: string;
  publicId: string;
  isThumbnail: boolean;
  displayOrder: number;
};

export type EventTaxonomyRef = { id: string; name: string; slug: string };

export type EventStatusHistoryEntry = {
  id: string;
  eventId: string;
  fromStatus: EventStatus;
  toStatus: EventStatus;
  note: string | null;
  actorId: string | null;
  createdAt: string;
};

export type EventRecord = {
  id: string;
  organizerId: string;
  categoryId: string;
  industryId: string | null;
  title: string;
  description: string;
  registrationUrl: string;
  internalNotes: string | null;
  isFree: boolean;
  priceFromCents: number | null;
  currency: string;
  startAt: string;
  endAt: string | null;
  timezone: string;
  isOnline: boolean;
  city: string | null;
  state: string | null;
  venueName: string | null;
  address: string | null;
  latitude: number | null;
  longitude: number | null;
  contactName: string;
  contactEmail: string;
  contactPhone: string | null;
  status: EventStatus;
  latestAdminNote: string | null;
  submittedAt: string | null;
  publishedAt: string | null;
  archivedAt: string | null;
  isFeatured: boolean;
  featuredSince: string | null;
  category?: EventTaxonomyRef;
  industry?: EventTaxonomyRef | null;
  media?: EventMedia[];
  organizer?: { id: string; fullName: string; email: string };
  statusHistory?: EventStatusHistoryEntry[];
  createdAt: string;
  updatedAt: string;
};

export type CreateEventPayload = {
  title: string;
  description: string;
  registrationUrl: string;
  categoryId: string;
  industryId: string;
  isFree: boolean;
  priceFrom?: number;
  currency?: string;
  startDate: string;
  startTime: string;
  endDate?: string;
  endTime?: string;
  timezone: string;
  isOnline?: boolean;
  city?: string;
  state?: string;
  venueName?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  contactName: string;
  contactEmail: string;
  contactPhone?: string;
  internalNotes?: string;
};

export type UpdateEventPayload = Partial<CreateEventPayload>;

export const EVENT_STATUS_LABELS: Record<EventStatus, string> = {
  DRAFT: "Draft",
  UNDER_REVIEW: "Under Review",
  CHANGES_REQUESTED: "Changes Requested",
  PUBLISHED: "Published",
  REJECTED: "Rejected",
  ARCHIVED: "Archived",
};

export function isEventEditableByOrganizer(status: EventStatus) {
  return status === "DRAFT" || status === "UNDER_REVIEW" || status === "CHANGES_REQUESTED";
}

// Mirrors FEATURABLE_EVENT_STATUSES on the backend: any status except
// REJECTED, which is terminal and never eligible for Featured.
export function isEventFeaturableByOrganizer(status: EventStatus) {
  return status !== "REJECTED";
}
