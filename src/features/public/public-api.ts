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

export type AdvertisingPackage = {
  id: string;
  name: string;
  price: string;
  priceSuffix: string | null;
  badge: string | null;
  featured: boolean;
  description: string;
  label: string;
  details: string[];
  note: string | null;
  buttonLabel: string;
  buttonVariant: "solid" | "outline";
  displayOrder: number;
  isActive: boolean;
};

export type BrandSpotlight = {
  id: string;
  name: string;
  description: string;
  thumbnailImageUrl: string;
  logoImageUrl: string;
  websiteUrl: string;
  displayOrder: number;
  isActive: boolean;
};

export type SiteMessageCategory = "ADVERTISE" | "GENERAL_QUESTION" | "ORGANIZER_QUERY";

export type GeocodeResult = {
  displayName: string;
  latitude: number;
  longitude: number;
  venueName?: string;
  city?: string;
  state?: string;
  country?: string;
};

export type CreatePublicMessagePayload = {
  category: SiteMessageCategory;
  reasonLabel?: string;
  name: string;
  email: string;
  company?: string;
  message: string;
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

    listPublicAdvertisingPackages: builder.query<AdvertisingPackage[], void>({
      query: () => ({ url: "/public/advertising/packages" }),
      transformResponse: (response: ApiEnvelope<{ packages: AdvertisingPackage[] }>) =>
        response.data.packages,
      providesTags: [{ type: "AdvertisingPackage", id: "LIST" }],
    }),

    listPublicSpotlights: builder.query<BrandSpotlight[], void>({
      query: () => ({ url: "/public/advertising/spotlights" }),
      transformResponse: (response: ApiEnvelope<{ spotlights: BrandSpotlight[] }>) =>
        response.data.spotlights,
      providesTags: [{ type: "BrandSpotlight", id: "LIST" }],
    }),

    createPublicMessage: builder.mutation<void, CreatePublicMessagePayload>({
      query: (body) => ({ url: "/public/messages", method: "POST", body }),
    }),

    searchGeocode: builder.query<GeocodeResult[], string>({
      query: (q) => ({ url: "/public/geocode/search", params: { q } }),
      transformResponse: (response: ApiEnvelope<{ results: GeocodeResult[] }>) =>
        response.data.results,
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetIndustriesQuery,
  useListPublicEventsQuery,
  useGetPublicEventQuery,
  useRegisterClickThroughMutation,
  useListPublicAdvertisingPackagesQuery,
  useListPublicSpotlightsQuery,
  useCreatePublicMessageMutation,
  useLazySearchGeocodeQuery,
} = publicApi;
