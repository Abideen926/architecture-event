import { baseApi } from "@/lib/store/base-api";
import type { ApiEnvelope, PaginationMeta } from "@/lib/store/types";
import type { EventRecord } from "@/features/events/event-types";

export type Category = {
  id: string;
  name: string;
  slug: string;
  isActive: boolean;
  displayOrder: number;
};

export type Industry = {
  id: string;
  name: string;
  slug: string;
  isActive: boolean;
  displayOrder: number;
};

export const publicApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => ({ url: "/public/categories" }),
      transformResponse: (response: ApiEnvelope<{ categories: Category[] }>) =>
        response.data.categories,
      providesTags: ["Category"],
    }),

    getIndustries: builder.query<Industry[], void>({
      query: () => ({ url: "/public/industries" }),
      transformResponse: (response: ApiEnvelope<{ industries: Industry[] }>) =>
        response.data.industries,
      providesTags: ["Industry"],
    }),

    listPublicEvents: builder.query<
      { items: EventRecord[]; meta: PaginationMeta },
      {
        page?: number;
        limit?: number;
        search?: string;
        categoryId?: string;
        industryId?: string;
        isFree?: boolean;
        isOnline?: boolean;
        city?: string;
        sort?: string;
      } | void
    >({
      query: (params) => ({ url: "/public/events", params: params ?? undefined }),
      transformResponse: (response: ApiEnvelope<{ events: EventRecord[] }>) => ({
        items: response.data.events,
        meta: response.meta as PaginationMeta,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.items.map((event) => ({ type: "PublicEvent" as const, id: event.id })),
              { type: "PublicEvent" as const, id: "LIST" },
            ]
          : [{ type: "PublicEvent" as const, id: "LIST" }],
    }),

    getPublicEvent: builder.query<EventRecord, string>({
      query: (id) => ({ url: `/public/events/${id}` }),
      transformResponse: (response: ApiEnvelope<{ event: EventRecord }>) => response.data.event,
      providesTags: (_result, _error, id) => [{ type: "PublicEvent", id }],
    }),

    registerClickThrough: builder.mutation<{ registrationUrl: string }, string>({
      query: (id) => ({ url: `/public/events/${id}/register`, method: "POST" }),
      transformResponse: (response: ApiEnvelope<{ registrationUrl: string }>) => response.data,
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetIndustriesQuery,
  useListPublicEventsQuery,
  useGetPublicEventQuery,
  useRegisterClickThroughMutation,
} = publicApi;
