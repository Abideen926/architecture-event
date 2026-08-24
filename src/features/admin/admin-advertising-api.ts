import { baseApi } from "@/lib/store/base-api";
import type { ApiEnvelope } from "@/lib/store/types";
import type { AdvertisingPackage, BrandSpotlight } from "@/features/public/public-api";

export type CreateAdvertisingPackagePayload = {
  name: string;
  price: string;
  priceSuffix?: string;
  badge?: string;
  featured?: boolean;
  description: string;
  label: string;
  details: string[];
  note?: string;
  buttonLabel: string;
  buttonVariant?: "solid" | "outline";
  displayOrder?: number;
};

export type UpdateAdvertisingPackagePayload = Partial<CreateAdvertisingPackagePayload> & {
  id: string;
  isActive?: boolean;
};

export type CreateBrandSpotlightPayload = {
  name: string;
  description: string;
  websiteUrl: string;
  displayOrder?: number;
  thumbnailImage: File;
  logoImage: File;
};

export type UpdateBrandSpotlightPayload = {
  id: string;
  name?: string;
  description?: string;
  websiteUrl?: string;
  displayOrder?: number;
  isActive?: boolean;
  thumbnailImage?: File;
  logoImage?: File;
};

function buildSpotlightFormData(payload: {
  name?: string;
  description?: string;
  websiteUrl?: string;
  displayOrder?: number;
  isActive?: boolean;
  thumbnailImage?: File;
  logoImage?: File;
}) {
  const formData = new FormData();
  if (payload.name !== undefined) formData.append("name", payload.name);
  if (payload.description !== undefined) formData.append("description", payload.description);
  if (payload.websiteUrl !== undefined) formData.append("websiteUrl", payload.websiteUrl);
  if (payload.displayOrder !== undefined) formData.append("displayOrder", String(payload.displayOrder));
  if (payload.isActive !== undefined) formData.append("isActive", String(payload.isActive));
  if (payload.thumbnailImage) formData.append("thumbnailImage", payload.thumbnailImage);
  if (payload.logoImage) formData.append("logoImage", payload.logoImage);
  return formData;
}

export const adminAdvertisingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    listAdminAdvertisingPackages: builder.query<AdvertisingPackage[], void>({
      query: () => ({ url: "/admin/advertising/packages" }),
      transformResponse: (response: ApiEnvelope<{ packages: AdvertisingPackage[] }>) =>
        response.data.packages,
      providesTags: [{ type: "AdvertisingPackage", id: "LIST" }],
    }),

    createAdvertisingPackage: builder.mutation<AdvertisingPackage, CreateAdvertisingPackagePayload>({
      query: (body) => ({ url: "/admin/advertising/packages", method: "POST", body }),
      transformResponse: (response: ApiEnvelope<{ package: AdvertisingPackage }>) =>
        response.data.package,
      invalidatesTags: [{ type: "AdvertisingPackage", id: "LIST" }],
    }),

    updateAdvertisingPackage: builder.mutation<AdvertisingPackage, UpdateAdvertisingPackagePayload>({
      query: ({ id, ...body }) => ({ url: `/admin/advertising/packages/${id}`, method: "PATCH", body }),
      transformResponse: (response: ApiEnvelope<{ package: AdvertisingPackage }>) =>
        response.data.package,
      invalidatesTags: [{ type: "AdvertisingPackage", id: "LIST" }],
    }),

    deleteAdvertisingPackage: builder.mutation<void, string>({
      query: (id) => ({ url: `/admin/advertising/packages/${id}`, method: "DELETE" }),
      invalidatesTags: [{ type: "AdvertisingPackage", id: "LIST" }],
    }),

    listAdminSpotlights: builder.query<BrandSpotlight[], void>({
      query: () => ({ url: "/admin/advertising/spotlights" }),
      transformResponse: (response: ApiEnvelope<{ spotlights: BrandSpotlight[] }>) =>
        response.data.spotlights,
      providesTags: [{ type: "BrandSpotlight", id: "LIST" }],
    }),

    createSpotlight: builder.mutation<BrandSpotlight, CreateBrandSpotlightPayload>({
      query: (payload) => ({
        url: "/admin/advertising/spotlights",
        method: "POST",
        body: buildSpotlightFormData(payload),
      }),
      transformResponse: (response: ApiEnvelope<{ spotlight: BrandSpotlight }>) =>
        response.data.spotlight,
      invalidatesTags: [{ type: "BrandSpotlight", id: "LIST" }],
    }),

    updateSpotlight: builder.mutation<BrandSpotlight, UpdateBrandSpotlightPayload>({
      query: ({ id, ...payload }) => ({
        url: `/admin/advertising/spotlights/${id}`,
        method: "PATCH",
        body: buildSpotlightFormData(payload),
      }),
      transformResponse: (response: ApiEnvelope<{ spotlight: BrandSpotlight }>) =>
        response.data.spotlight,
      invalidatesTags: [{ type: "BrandSpotlight", id: "LIST" }],
    }),

    deleteSpotlight: builder.mutation<void, string>({
      query: (id) => ({ url: `/admin/advertising/spotlights/${id}`, method: "DELETE" }),
      invalidatesTags: [{ type: "BrandSpotlight", id: "LIST" }],
    }),
  }),
});

export const {
  useListAdminAdvertisingPackagesQuery,
  useCreateAdvertisingPackageMutation,
  useUpdateAdvertisingPackageMutation,
  useDeleteAdvertisingPackageMutation,
  useListAdminSpotlightsQuery,
  useCreateSpotlightMutation,
  useUpdateSpotlightMutation,
  useDeleteSpotlightMutation,
} = adminAdvertisingApi;
