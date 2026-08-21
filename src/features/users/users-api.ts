import { baseApi } from "@/lib/store/base-api";
import type { ApiEnvelope } from "@/lib/store/types";
import type { CurrentUser } from "@/features/auth/auth-api";

export const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateMyProfile: builder.mutation<CurrentUser, { fullName: string }>({
      query: (body) => ({ url: "/users/me", method: "PATCH", body }),
      transformResponse: (response: ApiEnvelope<{ user: CurrentUser }>) => response.data.user,
      invalidatesTags: ["Me"],
    }),

    changeMyPassword: builder.mutation<void, { currentPassword: string; newPassword: string }>({
      query: (body) => ({ url: "/users/me/password", method: "PATCH", body }),
    }),
  }),
});

export const { useUpdateMyProfileMutation, useChangeMyPasswordMutation } = usersApi;
