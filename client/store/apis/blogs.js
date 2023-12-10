import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const blogsApi = createApi({
  reducerPath: "blogsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_STRAPI_URL}/blogs`,
  }),
  endpoints: (builder) => ({
    getBlogs: builder.mutation({
      query: (query) => ({
        url: `?${query}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetBlogsMutation } = blogsApi;
