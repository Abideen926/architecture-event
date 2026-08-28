import { baseApi } from "@/lib/store/base-api";
import type { ApiEnvelope, PaginationMeta } from "@/lib/store/types";
import type { SiteMessageCategory } from "@/features/public/public-api";

export type SiteMessage = {
  id: string;
  category: SiteMessageCategory;
  requestType: "PACKAGE_REQUEST" | "GENERAL_INQUIRY";
  fromName: string;
  fromEmail: string;
  fromCompany: string | null;
  reasonLabel: string | null;
  subject: string;
  body: string;
  resolved: boolean;
  repliedAt: string | null;
  repliedBody: string | null;
  threadToken: string;
  lastMessageAt: string;
  createdAt: string;
  package?: { id: string; name: string } | null;
  organizer?: { id: string; fullName: string; email: string } | null;
};

export type SiteMessageEvent = {
  id: string;
  threadId: string;
  direction: "INBOUND" | "OUTBOUND";
  channel: "FORM" | "EMAIL";
  senderName: string | null;
  senderEmail: string | null;
  body: string;
  bodyHtml: string | null;
  adminId: string | null;
  status: "SENT" | "FAILED" | null;
  createdAt: string;
  admin?: { id: string; fullName: string } | null;
};

export type SiteMessageThread = {
  message: SiteMessage;
  events: SiteMessageEvent[];
};

export type ListAdminMessagesParams = {
  category?: SiteMessageCategory;
  resolved?: boolean;
  search?: string;
  page?: number;
  limit?: number;
};

export const adminMessagesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    listAdminMessages: builder.query<
      { items: SiteMessage[]; meta: PaginationMeta },
      ListAdminMessagesParams | void
    >({
      query: (params) => ({ url: "/admin/messages", params: params ?? undefined }),
      transformResponse: (response: ApiEnvelope<{ messages: SiteMessage[] }>) => ({
        items: response.data.messages,
        meta: response.meta as PaginationMeta,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.items.map((item) => ({ type: "SiteMessage" as const, id: item.id })),
              { type: "SiteMessage" as const, id: "LIST" },
            ]
          : [{ type: "SiteMessage" as const, id: "LIST" }],
    }),

    getAdminMessageThread: builder.query<SiteMessageThread, string>({
      query: (id) => ({ url: `/admin/messages/${id}` }),
      transformResponse: (response: ApiEnvelope<SiteMessageThread>) => response.data,
      providesTags: (_result, _error, id) => [{ type: "SiteMessage", id }],
    }),

    updateAdminMessage: builder.mutation<SiteMessage, { id: string; resolved: boolean }>({
      query: ({ id, resolved }) => ({ url: `/admin/messages/${id}`, method: "PATCH", body: { resolved } }),
      transformResponse: (response: ApiEnvelope<{ message: SiteMessage }>) => response.data.message,
      invalidatesTags: (_result, _error, { id }) => [
        { type: "SiteMessage", id },
        { type: "SiteMessage", id: "LIST" },
      ],
    }),

    replyToAdminMessage: builder.mutation<SiteMessage, { id: string; body: string }>({
      query: ({ id, body }) => ({ url: `/admin/messages/${id}/reply`, method: "POST", body: { body } }),
      transformResponse: (response: ApiEnvelope<{ message: SiteMessage }>) => response.data.message,
      invalidatesTags: (_result, _error, { id }) => [
        { type: "SiteMessage", id },
        { type: "SiteMessage", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useListAdminMessagesQuery,
  useGetAdminMessageThreadQuery,
  useUpdateAdminMessageMutation,
  useReplyToAdminMessageMutation,
} = adminMessagesApi;
