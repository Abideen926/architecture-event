import { baseApi } from "@/lib/store/base-api";
import type { ApiEnvelope, PaginationMeta } from "@/lib/store/types";
import type { CurrentUser } from "@/features/auth/auth-api";

export type ListUsersParams = {
  page?: number;
  limit?: number;
  search?: string;
  role?: string;
};

export const adminUsersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    listUsers: builder.query<{ items: CurrentUser[]; meta: PaginationMeta }, ListUsersParams | void>({
      query: (params) => ({ url: "/users", params: params ?? undefined }),
      transformResponse: (response: ApiEnvelope<{ users: CurrentUser[] }>) => ({
        items: response.data.users,
        meta: response.meta as PaginationMeta,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.items.map((user) => ({ type: "AdminUser" as const, id: user.id })),
              { type: "AdminUser" as const, id: "LIST" },
            ]
          : [{ type: "AdminUser" as const, id: "LIST" }],
    }),

    updateUserStatus: builder.mutation<CurrentUser, { id: string; isActive: boolean }>({
      query: ({ id, isActive }) => ({
        url: `/users/${id}/status`,
        method: "PATCH",
        body: { isActive },
      }),
      transformResponse: (response: ApiEnvelope<{ user: CurrentUser }>) => response.data.user,
      invalidatesTags: (_result, _error, { id }) => [
        { type: "AdminUser", id },
        { type: "AdminUser", id: "LIST" },
      ],
    }),

    updateUserRole: builder.mutation<CurrentUser, { id: string; role: string }>({
      query: ({ id, role }) => ({ url: `/users/${id}/role`, method: "PATCH", body: { role } }),
      transformResponse: (response: ApiEnvelope<{ user: CurrentUser }>) => response.data.user,
      invalidatesTags: (_result, _error, { id }) => [
        { type: "AdminUser", id },
        { type: "AdminUser", id: "LIST" },
      ],
    }),
  }),
});

export const { useListUsersQuery, useUpdateUserStatusMutation, useUpdateUserRoleMutation } =
  adminUsersApi;
