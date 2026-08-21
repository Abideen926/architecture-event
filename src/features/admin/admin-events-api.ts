import { baseApi } from "@/lib/store/base-api";
import type { ApiEnvelope, PaginationMeta } from "@/lib/store/types";
import type { EventRecord } from "@/features/events/event-types";

export type ListAdminEventsParams = {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  categoryId?: string;
  sort?: string;
};

export const adminEventsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    listAdminEvents: builder.query<
      { items: EventRecord[]; meta: PaginationMeta },
      ListAdminEventsParams | void
    >({
      query: (params) => ({ url: "/admin/events", params: params ?? undefined }),
      transformResponse: (response: ApiEnvelope<{ events: EventRecord[] }>) => ({
        items: response.data.events,
        meta: response.meta as PaginationMeta,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.items.map((event) => ({ type: "AdminEvent" as const, id: event.id })),
              { type: "AdminEvent" as const, id: "LIST" },
            ]
          : [{ type: "AdminEvent" as const, id: "LIST" }],
    }),

    getAdminEvent: builder.query<EventRecord, string>({
      query: (id) => ({ url: `/admin/events/${id}` }),
      transformResponse: (response: ApiEnvelope<{ event: EventRecord }>) => response.data.event,
      providesTags: (_result, _error, id) => [{ type: "AdminEvent", id }],
    }),

    approveEvent: builder.mutation<EventRecord, string>({
      query: (id) => ({ url: `/admin/events/${id}/approve`, method: "POST" }),
      transformResponse: (response: ApiEnvelope<{ event: EventRecord }>) => response.data.event,
      invalidatesTags: (_result, _error, id) => [
        { type: "AdminEvent", id },
        { type: "AdminEvent", id: "LIST" },
        { type: "PublicEvent", id: "LIST" },
        "AdminStats",
        "AdminReports",
      ],
    }),

    requestEventChanges: builder.mutation<EventRecord, { id: string; note: string }>({
      query: ({ id, note }) => ({
        url: `/admin/events/${id}/request-changes`,
        method: "POST",
        body: { note },
      }),
      transformResponse: (response: ApiEnvelope<{ event: EventRecord }>) => response.data.event,
      invalidatesTags: (_result, _error, { id }) => [
        { type: "AdminEvent", id },
        { type: "AdminEvent", id: "LIST" },
        { type: "PublicEvent", id: "LIST" },
        "AdminStats",
      ],
    }),

    rejectEvent: builder.mutation<EventRecord, { id: string; reason: string }>({
      query: ({ id, reason }) => ({
        url: `/admin/events/${id}/reject`,
        method: "POST",
        body: { reason },
      }),
      transformResponse: (response: ApiEnvelope<{ event: EventRecord }>) => response.data.event,
      invalidatesTags: (_result, _error, { id }) => [
        { type: "AdminEvent", id },
        { type: "AdminEvent", id: "LIST" },
        "AdminStats",
      ],
    }),
  }),
});

export const {
  useListAdminEventsQuery,
  useGetAdminEventQuery,
  useApproveEventMutation,
  useRequestEventChangesMutation,
  useRejectEventMutation,
} = adminEventsApi;
