import { baseApi } from "@/lib/store/base-api";
import type { ApiEnvelope } from "@/lib/store/types";

export type EventVolumePoint = {
  month: string; // "YYYY-MM"
  submitted: number;
  published: number;
};

export type LeadVolumeMetric = { total: number; thisMonth: number };

export type AdminReportsData = {
  eventVolume: EventVolumePoint[];
  leadVolume: {
    saved: LeadVolumeMetric;
    registered: LeadVolumeMetric;
    total: number;
    thisMonthTotal: number;
  };
};

export const adminReportsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminReports: builder.query<AdminReportsData, void>({
      query: () => ({ url: "/admin/reports" }),
      transformResponse: (response: ApiEnvelope<AdminReportsData>) => response.data,
      providesTags: ["AdminReports"],
    }),
  }),
});

export const { useGetAdminReportsQuery } = adminReportsApi;
