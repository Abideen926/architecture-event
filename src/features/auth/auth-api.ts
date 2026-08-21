import { baseApi } from "@/lib/store/base-api";
import type { ApiEnvelope } from "@/lib/store/types";

export type UserRole = "ATTENDEE" | "ORGANIZER" | "ADMIN";

export type CurrentUser = {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  isEmailVerified: boolean;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type LoginRequest = { email: string; password: string };

export type RegisterAttendeeRequest = {
  fullName: string;
  email: string;
  password: string;
  professionalRole?: string;
  followedCategoryIds?: string[];
  followedLocations?: string[];
  newsletterOptIn?: boolean;
};

export type RegisterOrganizerRequest = {
  fullName: string;
  email: string;
  password: string;
  organizationName: string;
  website?: string;
  phone?: string;
};

export type OtpPurpose = "EMAIL_VERIFICATION" | "PASSWORD_RESET";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<CurrentUser, LoginRequest>({
      query: (body) => ({ url: "/auth/login", method: "POST", body }),
      transformResponse: (response: ApiEnvelope<{ user: CurrentUser; accessToken: string }>) =>
        response.data.user,
      invalidatesTags: ["Me"],
    }),

    registerAttendee: builder.mutation<{ user: CurrentUser }, RegisterAttendeeRequest>({
      query: (body) => ({ url: "/auth/register/attendee", method: "POST", body }),
      transformResponse: (response: ApiEnvelope<{ user: CurrentUser }>) => response.data,
    }),

    registerOrganizer: builder.mutation<{ user: CurrentUser }, RegisterOrganizerRequest>({
      query: (body) => ({ url: "/auth/register/organizer", method: "POST", body }),
      transformResponse: (response: ApiEnvelope<{ user: CurrentUser }>) => response.data,
    }),

    resendOtp: builder.mutation<void, { email: string; purpose: OtpPurpose }>({
      query: (body) => ({ url: "/auth/resend-otp", method: "POST", body }),
    }),

    verifyEmail: builder.mutation<CurrentUser, { email: string; otp: string }>({
      query: (body) => ({ url: "/auth/verify-email", method: "POST", body }),
      transformResponse: (response: ApiEnvelope<{ user: CurrentUser; accessToken: string }>) =>
        response.data.user,
      invalidatesTags: ["Me"],
    }),

    forgotPassword: builder.mutation<void, { email: string }>({
      query: (body) => ({ url: "/auth/forgot-password", method: "POST", body }),
    }),

    verifyResetOtp: builder.mutation<void, { email: string; otp: string }>({
      query: (body) => ({ url: "/auth/verify-reset-otp", method: "POST", body }),
    }),

    resetPassword: builder.mutation<void, { newPassword: string }>({
      query: (body) => ({ url: "/auth/reset-password", method: "POST", body }),
    }),

    logout: builder.mutation<void, void>({
      query: () => ({ url: "/auth/logout", method: "POST" }),
      invalidatesTags: ["Me"],
    }),

    getMe: builder.query<CurrentUser, void>({
      query: () => ({ url: "/auth/me" }),
      transformResponse: (response: ApiEnvelope<{ user: CurrentUser }>) => response.data.user,
      providesTags: ["Me"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterAttendeeMutation,
  useRegisterOrganizerMutation,
  useResendOtpMutation,
  useVerifyEmailMutation,
  useForgotPasswordMutation,
  useVerifyResetOtpMutation,
  useResetPasswordMutation,
  useLogoutMutation,
  useGetMeQuery,
  useLazyGetMeQuery,
} = authApi;
