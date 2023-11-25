import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const globalApi = createApi({
  reducerPath: "globalApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_CLIENT_URL}/api`,
  }),
  endpoints: (builder) => ({
    revalidation: builder.mutation({
      query: (tag) => ({
        url: `/revalidate?tag=${tag}&secret=${process.env.NEXT_PUBLIC_MY_SECRET_TOKEN}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useRevalidationMutation } = globalApi;
