import { api } from "../../services/api";

export const menuApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMenuItems: builder.query({
      query: () => ({
        url: "/rest/v1/menu_items",
        headers: {
          Prefer: "return=representation",
        },
      }),
      providesTags: ["MenuItem"],
    }),

    getCategories: builder.query({
      query: () => ({
        url: "/rest/v1/categories",
        headers: {
          Prefer: "return=representation",
        },
      }),
      providesTags: ["Category"],
    }),

    addMenuItem: builder.mutation({
      query: (item) => ({
        url: "/rest/v1/menu_items",
        method: "POST",
        headers: {
          Prefer: "return=representation",
        },
        body: item,
      }),
      invalidatesTags: ["MenuItem"],
    }),

    updateMenuItem: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/rest/v1/menu_items?id=eq.${id}`,
        method: "PATCH",
        headers: {
          Prefer: "return=representation",
        },
        body: patch,
      }),
      invalidatesTags: ["MenuItem"],
    }),

    deleteMenuItem: builder.mutation({
      query: (id) => ({
        url: `/rest/v1/menu_items?id=eq.${id}`,
        method: "DELETE",
        headers: {
          Prefer: "return=representation",
        },
      }),
      invalidatesTags: ["MenuItem"],
    }),
  }),
});

export const {
  useGetMenuItemsQuery,
  useGetCategoriesQuery,
  useAddMenuItemMutation,
  useUpdateMenuItemMutation,
  useDeleteMenuItemMutation,
} = menuApi;
