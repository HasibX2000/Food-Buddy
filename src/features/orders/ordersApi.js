import { api } from "../../services/api";

export const ordersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: (params) => ({
        url: "/rest/v1/orders",
        headers: {
          Prefer: "return=representation",
        },
        params: params,
      }),
      providesTags: ["Orders"],
    }),

    updateOrderStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/rest/v1/orders?id=eq.${id}`,
        method: "PATCH",
        headers: {
          Prefer: "return=representation",
        },
        body: { status },
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const { useGetOrdersQuery, useUpdateOrderStatusMutation } = ordersApi;
