import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const blogsApi = createApi({
  reducerPath: "blogsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_STRAPI_URL}/blogs`,
  }),
  endpoints: (builder) => ({
    getBlogs: builder.mutation({
      query: (query, token) => ({
        url: `?${query}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token || process.env.NEXT_PUBLIC_APP_TOKEN}`,
        },
      }),
    }),
  }),
});

export const { useGetBlogsMutation } = blogsApi;
