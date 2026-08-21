import { baseApi } from "@/lib/store/base-api";
import type { ApiEnvelope, PaginationMeta } from "@/lib/store/types";
import type { EventMedia, EventStatus, EventTaxonomyRef } from "@/features/events/event-types";

export type AttendeeProfile = {
  userId: string;
  professionalRole: string | null;
  newsletterOptIn: boolean;
  followedLocations: string[];
  followedCategories: EventTaxonomyRef[];
};

export type InteractionEventSummary = {
  id: string;
  title: string;
  city: string | null;
  isOnline: boolean;
  startAt: string;
  status: EventStatus;
  isFeatured: boolean;
  category?: EventTaxonomyRef;
  industry?: EventTaxonomyRef | null;
  media?: EventMedia[];
};

export type AttendeeInteraction = {
  id: string;
  attendeeId: string;
  eventId: string;
  // Independent facts about the same attendee+event pair — saving an event
  // never affects whether it's registered, and vice versa.
  isSaved: boolean;
  isRegistered: boolean;
  createdAt: string;
  event: InteractionEventSummary;
};

export type UpdateAttendeeProfilePayload = {
  professionalRole?: string;
  newsletterOptIn?: boolean;
  followedLocations?: string[];
  followedCategoryIds?: string[];
};

export const attendeeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAttendeeProfile: builder.query<AttendeeProfile, void>({
      query: () => ({ url: "/attendee/profile" }),
      transformResponse: (response: ApiEnvelope<{ profile: AttendeeProfile }>) =>
        response.data.profile,
      providesTags: ["AttendeeProfile"],
    }),

    updateAttendeeProfile: builder.mutation<AttendeeProfile, UpdateAttendeeProfilePayload>({
      query: (body) => ({ url: "/attendee/profile", method: "PATCH", body }),
      transformResponse: (response: ApiEnvelope<{ profile: AttendeeProfile }>) =>
        response.data.profile,
      invalidatesTags: ["AttendeeProfile"],
    }),

    listSavedEvents: builder.query<
      { items: AttendeeInteraction[]; meta: PaginationMeta },
      { page?: number; limit?: number } | void
    >({
      query: (params) => ({ url: "/attendee/events/saved", params: params ?? undefined }),
      transformResponse: (response: ApiEnvelope<{ interactions: AttendeeInteraction[] }>) => ({
        items: response.data.interactions,
        meta: response.meta as PaginationMeta,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.items.map((item) => ({ type: "AttendeeInteraction" as const, id: item.id })),
              { type: "AttendeeInteraction" as const, id: "SAVED_LIST" },
            ]
          : [{ type: "AttendeeInteraction" as const, id: "SAVED_LIST" }],
    }),

    listInteractionHistory: builder.query<
      { items: AttendeeInteraction[]; meta: PaginationMeta },
      { page?: number; limit?: number } | void
    >({
      query: (params) => ({ url: "/attendee/events/history", params: params ?? undefined }),
      transformResponse: (response: ApiEnvelope<{ interactions: AttendeeInteraction[] }>) => ({
        items: response.data.interactions,
        meta: response.meta as PaginationMeta,
      }),
      providesTags: [{ type: "AttendeeInteraction", id: "HISTORY_LIST" }],
    }),

    saveEvent: builder.mutation<void, string>({
      query: (eventId) => ({ url: `/attendee/events/${eventId}/save`, method: "POST" }),
      invalidatesTags: [
        { type: "AttendeeInteraction", id: "SAVED_LIST" },
        { type: "AttendeeInteraction", id: "HISTORY_LIST" },
      ],
    }),

    unsaveEvent: builder.mutation<void, string>({
      query: (eventId) => ({ url: `/attendee/events/${eventId}/save`, method: "DELETE" }),
      invalidatesTags: [
        { type: "AttendeeInteraction", id: "SAVED_LIST" },
        { type: "AttendeeInteraction", id: "HISTORY_LIST" },
      ],
    }),
  }),
});

export const {
  useGetAttendeeProfileQuery,
  useUpdateAttendeeProfileMutation,
  useListSavedEventsQuery,
  useListInteractionHistoryQuery,
  useSaveEventMutation,
  useUnsaveEventMutation,
} = attendeeApi;
