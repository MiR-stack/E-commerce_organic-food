import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_STRAPI_URL,
  }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (url) => ({
        url: `/products?${url}`,
      }),
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;
