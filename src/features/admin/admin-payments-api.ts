import { baseApi } from "@/lib/store/base-api";
import type { ApiEnvelope } from "@/lib/store/types";

export type LedgerTransaction = {
  id: string;
  type: string;
  description: string;
  amountCents: number;
  currency: string;
  feeCents: number;
  netCents: number;
  status: string;
  createdAt: string;
};

export type LedgerPage = {
  transactions: LedgerTransaction[];
  hasMore: boolean;
};

export const adminPaymentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    listAdminLedger: builder.query<LedgerPage, { limit?: number; startingAfter?: string } | void>({
      query: (params) => ({ url: "/admin/payments/ledger", params: params ?? undefined }),
      transformResponse: (response: ApiEnvelope<LedgerPage>) => response.data,
    }),
  }),
});

export const { useListAdminLedgerQuery } = adminPaymentsApi;
