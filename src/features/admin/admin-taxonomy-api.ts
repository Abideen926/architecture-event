import { baseApi } from "@/lib/store/base-api";
import type { ApiEnvelope } from "@/lib/store/types";

export type TaxonomyItem = {
  id: string;
  name: string;
  slug: string;
  isActive: boolean;
  displayOrder: number;
};

export const adminTaxonomyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    listAdminCategories: builder.query<TaxonomyItem[], void>({
      query: () => ({ url: "/admin/categories" }),
      transformResponse: (response: ApiEnvelope<{ categories: TaxonomyItem[] }>) =>
        response.data.categories,
      providesTags: ["Category"],
    }),

    createCategory: builder.mutation<TaxonomyItem, { name: string; displayOrder?: number }>({
      query: (body) => ({ url: "/admin/categories", method: "POST", body }),
      transformResponse: (response: ApiEnvelope<{ item: TaxonomyItem }>) => response.data.item,
      invalidatesTags: ["Category"],
    }),

    updateCategory: builder.mutation<
      TaxonomyItem,
      { id: string; name?: string; displayOrder?: number; isActive?: boolean }
    >({
      query: ({ id, ...body }) => ({ url: `/admin/categories/${id}`, method: "PATCH", body }),
      transformResponse: (response: ApiEnvelope<{ item: TaxonomyItem }>) => response.data.item,
      invalidatesTags: ["Category"],
    }),

    listAdminIndustries: builder.query<TaxonomyItem[], void>({
      query: () => ({ url: "/admin/industries" }),
      transformResponse: (response: ApiEnvelope<{ industries: TaxonomyItem[] }>) =>
        response.data.industries,
      providesTags: ["Industry"],
    }),

    createIndustry: builder.mutation<TaxonomyItem, { name: string; displayOrder?: number }>({
      query: (body) => ({ url: "/admin/industries", method: "POST", body }),
      transformResponse: (response: ApiEnvelope<{ item: TaxonomyItem }>) => response.data.item,
      invalidatesTags: ["Industry"],
    }),

    updateIndustry: builder.mutation<
      TaxonomyItem,
      { id: string; name?: string; displayOrder?: number; isActive?: boolean }
    >({
      query: ({ id, ...body }) => ({ url: `/admin/industries/${id}`, method: "PATCH", body }),
      transformResponse: (response: ApiEnvelope<{ item: TaxonomyItem }>) => response.data.item,
      invalidatesTags: ["Industry"],
    }),
  }),
});

export const {
  useListAdminCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useListAdminIndustriesQuery,
  useCreateIndustryMutation,
  useUpdateIndustryMutation,
} = adminTaxonomyApi;
