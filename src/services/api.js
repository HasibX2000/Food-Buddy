import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { config } from "../config/env";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: config.supabase.url,
    prepareHeaders: (headers) => {
      headers.set("apikey", config.supabase.anonKey);
      headers.set("Authorization", `Bearer ${config.supabase.anonKey}`);
      return headers;
    },
  }),
  tagTypes: ["Menu", "Orders", "Reservations"],
  endpoints: () => ({}),
});
