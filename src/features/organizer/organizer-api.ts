import { baseApi } from "@/lib/store/base-api";
import type { ApiEnvelope, PaginationMeta } from "@/lib/store/types";
import type {
  CreateEventPayload,
  EventMedia,
  EventMediaType,
  EventRecord,
  EventStatus,
  UpdateEventPayload,
} from "@/features/events/event-types";

export type OrganizerProfile = {
  userId: string;
  organizationName: string;
  website: string | null;
  phone: string | null;
  logoUrl: string | null;
};

export type FeatureRequestStatus =
  | "PENDING_PAYMENT"
  | "PENDING_REVIEW"
  | "APPROVED"
  | "REJECTED"
  | "PAYMENT_FAILED"
  | "CANCELLED";

export type RefundStatus = "NONE" | "PENDING" | "SUCCEEDED" | "FAILED";

export type FeatureRequest = {
  id: string;
  eventId: string;
  organizerId: string;
  status: FeatureRequestStatus;
  amountCents: number;
  currency: string;
  headline: string | null;
  checkoutUrl?: string;
  refundStatus: RefundStatus;
  paidAt: string | null;
  reviewedAt: string | null;
  adminNote: string | null;
  createdAt: string;
  // Populated on both the organizer and admin list endpoints; `organizer`
  // is only ever present on the admin listing.
  event?: { id: string; title: string; status: EventStatus; startAt?: string };
  organizer?: { id: string; fullName: string; email: string };
};

export type MediaUploadSignature = {
  signature: string;
  timestamp: number;
  folder: string;
  apiKey: string;
  cloudName: string;
  resourceType: string;
  uploadUrl: string;
};

export type ListOrganizerEventsParams = {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  sort?: string;
};

export const organizerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrganizerProfile: builder.query<OrganizerProfile, void>({
      query: () => ({ url: "/organizer/profile" }),
      transformResponse: (response: ApiEnvelope<{ profile: OrganizerProfile }>) =>
        response.data.profile,
      providesTags: ["OrganizerProfile"],
    }),

    updateOrganizerProfile: builder.mutation<
      OrganizerProfile,
      { organizationName?: string; website?: string; phone?: string }
    >({
      query: (body) => ({ url: "/organizer/profile", method: "PATCH", body }),
      transformResponse: (response: ApiEnvelope<{ profile: OrganizerProfile }>) =>
        response.data.profile,
      invalidatesTags: ["OrganizerProfile"],
    }),

    listOrganizerEvents: builder.query<
      { items: EventRecord[]; meta: PaginationMeta },
      ListOrganizerEventsParams | void
    >({
      query: (params) => ({ url: "/organizer/events", params: params ?? undefined }),
      transformResponse: (response: ApiEnvelope<{ events: EventRecord[] }>) => ({
        items: response.data.events,
        meta: response.meta as PaginationMeta,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.items.map((event) => ({ type: "OrganizerEvent" as const, id: event.id })),
              { type: "OrganizerEvent" as const, id: "LIST" },
            ]
          : [{ type: "OrganizerEvent" as const, id: "LIST" }],
    }),

    getOrganizerEvent: builder.query<EventRecord, string>({
      query: (id) => ({ url: `/organizer/events/${id}` }),
      transformResponse: (response: ApiEnvelope<{ event: EventRecord }>) => response.data.event,
      providesTags: (_result, _error, id) => [{ type: "OrganizerEvent", id }],
    }),

    createOrganizerEvent: builder.mutation<EventRecord, CreateEventPayload>({
      query: (body) => ({ url: "/organizer/events", method: "POST", body }),
      transformResponse: (response: ApiEnvelope<{ event: EventRecord }>) => response.data.event,
      invalidatesTags: [{ type: "OrganizerEvent", id: "LIST" }],
    }),

    updateOrganizerEvent: builder.mutation<EventRecord, { id: string; body: UpdateEventPayload }>({
      query: ({ id, body }) => ({ url: `/organizer/events/${id}`, method: "PATCH", body }),
      transformResponse: (response: ApiEnvelope<{ event: EventRecord }>) => response.data.event,
      invalidatesTags: (_result, _error, { id }) => [
        { type: "OrganizerEvent", id },
        { type: "OrganizerEvent", id: "LIST" },
      ],
    }),

    submitOrganizerEvent: builder.mutation<
      { event: EventRecord; featureRequest: FeatureRequest | null },
      { id: string; requestFeatured?: boolean; featuredHeadline?: string }
    >({
      query: ({ id, ...body }) => ({ url: `/organizer/events/${id}/submit`, method: "POST", body }),
      transformResponse: (
        response: ApiEnvelope<{ event: EventRecord; featureRequest: FeatureRequest | null }>
      ) => response.data,
      invalidatesTags: (_result, _error, { id }) => [
        { type: "OrganizerEvent", id },
        { type: "OrganizerEvent", id: "LIST" },
      ],
    }),

    resubmitOrganizerEvent: builder.mutation<EventRecord, string>({
      query: (id) => ({ url: `/organizer/events/${id}/resubmit`, method: "POST" }),
      transformResponse: (response: ApiEnvelope<{ event: EventRecord }>) => response.data.event,
      invalidatesTags: (_result, _error, id) => [
        { type: "OrganizerEvent", id },
        { type: "OrganizerEvent", id: "LIST" },
      ],
    }),

    getMediaUploadSignature: builder.mutation<
      MediaUploadSignature,
      { id: string; resourceType: EventMediaType }
    >({
      query: ({ id, resourceType }) => ({
        url: `/organizer/events/${id}/media/signature`,
        method: "POST",
        body: { resourceType },
      }),
      transformResponse: (response: ApiEnvelope<MediaUploadSignature>) => response.data,
    }),

    attachEventMedia: builder.mutation<
      EventMedia,
      { id: string; publicId: string; url: string; resourceType: EventMediaType; isThumbnail?: boolean }
    >({
      query: ({ id, ...body }) => ({ url: `/organizer/events/${id}/media`, method: "POST", body }),
      transformResponse: (response: ApiEnvelope<{ media: EventMedia }>) => response.data.media,
      invalidatesTags: (_result, _error, { id }) => [{ type: "OrganizerEvent", id }],
    }),

    setEventThumbnail: builder.mutation<EventMedia, { id: string; mediaId: string }>({
      query: ({ id, mediaId }) => ({
        url: `/organizer/events/${id}/media/${mediaId}/thumbnail`,
        method: "PATCH",
      }),
      transformResponse: (response: ApiEnvelope<{ media: EventMedia }>) => response.data.media,
      invalidatesTags: (_result, _error, { id }) => [{ type: "OrganizerEvent", id }],
    }),

    deleteEventMedia: builder.mutation<void, { id: string; mediaId: string }>({
      query: ({ id, mediaId }) => ({
        url: `/organizer/events/${id}/media/${mediaId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "OrganizerEvent", id }],
    }),

    createFeatureRequest: builder.mutation<FeatureRequest, { id: string; headline?: string }>({
      query: ({ id, headline }) => ({
        url: `/organizer/events/${id}/feature-requests`,
        method: "POST",
        body: headline ? { headline } : {},
      }),
      transformResponse: (response: ApiEnvelope<{ featureRequest: FeatureRequest }>) =>
        response.data.featureRequest,
      invalidatesTags: (_result, _error, { id }) => [
        { type: "OrganizerEvent", id },
        "FeatureRequest",
      ],
    }),

    listMyFeatureRequests: builder.query<
      { items: FeatureRequest[]; meta: PaginationMeta },
      { status?: string; page?: number } | void
    >({
      query: (params) => ({ url: "/organizer/feature-requests", params: params ?? undefined }),
      transformResponse: (response: ApiEnvelope<{ featureRequests: FeatureRequest[] }>) => ({
        items: response.data.featureRequests,
        meta: response.meta as PaginationMeta,
      }),
      providesTags: ["FeatureRequest"],
    }),

    retryFeatureRequestPayment: builder.mutation<FeatureRequest, string>({
      query: (id) => ({ url: `/organizer/feature-requests/${id}/retry-payment`, method: "POST" }),
      transformResponse: (response: ApiEnvelope<{ featureRequest: FeatureRequest }>) =>
        response.data.featureRequest,
      invalidatesTags: ["FeatureRequest"],
    }),
  }),
});

export const {
  useGetOrganizerProfileQuery,
  useUpdateOrganizerProfileMutation,
  useListOrganizerEventsQuery,
  useGetOrganizerEventQuery,
  useCreateOrganizerEventMutation,
  useUpdateOrganizerEventMutation,
  useSubmitOrganizerEventMutation,
  useResubmitOrganizerEventMutation,
  useGetMediaUploadSignatureMutation,
  useAttachEventMediaMutation,
  useSetEventThumbnailMutation,
  useDeleteEventMediaMutation,
  useCreateFeatureRequestMutation,
  useListMyFeatureRequestsQuery,
  useRetryFeatureRequestPaymentMutation,
} = organizerApi;
