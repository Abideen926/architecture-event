import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import type { ApiErrorShape } from "./types";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: "/api",
  credentials: "same-origin",
});

const baseQueryWithErrorNormalization: BaseQueryFn<string | FetchArgs, unknown, ApiErrorShape> =
  async (args, api, extraOptions) => {
    const result = await rawBaseQuery(args, api, extraOptions);

    if (result.error) {
      const fetchError = result.error as FetchBaseQueryError;
      const data = fetchError.data as
        | { message?: string; errors?: { field?: string; message: string }[] }
        | undefined;

      return {
        error: {
          statusCode: typeof fetchError.status === "number" ? fetchError.status : undefined,
          message: data?.message ?? "Something went wrong. Please try again.",
          errors: data?.errors,
        },
      };
    }

    return result;
  };

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithErrorNormalization,
  tagTypes: [
    "Me",
    "AttendeeProfile",
    "OrganizerProfile",
    "OrganizerEvent",
    "AdminEvent",
    "PublicEvent",
    "Category",
    "Industry",
    "FeatureRequest",
    "AdminUser",
    "AttendeeInteraction",
    "AdminStats",
    "AdminReports",
  ],
  endpoints: () => ({}),
});
