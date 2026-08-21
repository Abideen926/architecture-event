import { baseApi } from "@/lib/store/base-api";
import type { ApiEnvelope } from "@/lib/store/types";
import type { EventStatus } from "@/features/events/event-types";

export type AdminOverviewStats = {
  events: {
    total: number;
    byStatus: Record<EventStatus, number>;
  };
  organizers: { total: number };
  attendees: { total: number };
  featureRequests: { pendingReview: number };
  attention: {
    eventsAwaitingReview: {
      count: number;
      oldest: { id: string; title: string; submittedAt: string } | null;
    };
    changesRequested: { count: number };
    pendingFeatureRequests: { count: number };
  };
};

export const adminStatsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminOverviewStats: builder.query<AdminOverviewStats, void>({
      query: () => ({ url: "/admin/stats" }),
      transformResponse: (response: ApiEnvelope<{ stats: AdminOverviewStats }>) =>
        response.data.stats,
      providesTags: ["AdminStats"],
    }),
  }),
});

export const { useGetAdminOverviewStatsQuery } = adminStatsApi;
