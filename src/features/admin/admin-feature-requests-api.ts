import { baseApi } from "@/lib/store/base-api";
import type { ApiEnvelope, PaginationMeta } from "@/lib/store/types";
import type { FeatureRequest } from "@/features/organizer/organizer-api";

export const adminFeatureRequestsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    listAdminFeatureRequests: builder.query<
      { items: FeatureRequest[]; meta: PaginationMeta },
      { status?: string; page?: number; limit?: number; search?: string; eventId?: string } | void
    >({
      query: (params) => ({ url: "/admin/feature-requests", params: params ?? undefined }),
      transformResponse: (response: ApiEnvelope<{ featureRequests: FeatureRequest[] }>) => ({
        items: response.data.featureRequests,
        meta: response.meta as PaginationMeta,
      }),
      providesTags: ["FeatureRequest"],
    }),

    approveFeatureRequest: builder.mutation<FeatureRequest, string>({
      query: (id) => ({ url: `/admin/feature-requests/${id}/approve`, method: "POST" }),
      transformResponse: (response: ApiEnvelope<{ featureRequest: FeatureRequest }>) =>
        response.data.featureRequest,
      invalidatesTags: ["FeatureRequest", "AdminStats", { type: "AdminEvent", id: "LIST" }],
    }),

    rejectFeatureRequest: builder.mutation<FeatureRequest, { id: string; reason: string }>({
      query: ({ id, reason }) => ({
        url: `/admin/feature-requests/${id}/reject`,
        method: "POST",
        body: { reason },
      }),
      transformResponse: (response: ApiEnvelope<{ featureRequest: FeatureRequest }>) =>
        response.data.featureRequest,
      invalidatesTags: ["FeatureRequest", "AdminStats"],
    }),

    retryFeatureRequestRefund: builder.mutation<FeatureRequest, string>({
      query: (id) => ({ url: `/admin/feature-requests/${id}/retry-refund`, method: "POST" }),
      transformResponse: (response: ApiEnvelope<{ featureRequest: FeatureRequest }>) =>
        response.data.featureRequest,
      invalidatesTags: ["FeatureRequest"],
    }),
  }),
});

export const {
  useListAdminFeatureRequestsQuery,
  useApproveFeatureRequestMutation,
  useRejectFeatureRequestMutation,
  useRetryFeatureRequestRefundMutation,
} = adminFeatureRequestsApi;
