import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const commentApi = createApi({
  reducerPath: "commentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_STRAPI_URL}/comments`,
  }),
  tagTypes: ["productComments"],
  endpoints: (builder) => ({
    getProductComments: builder.query({
      query: ({ modalName, id, url }) => ({
        url: `${modalName}${id}?${url || ""}`,
      }),
      providesTags: ["productComments"],
    }),
    createProductComment: builder.mutation({
      query: ({ modalName, id, content, threadOf, token }) => {
        let data = { content };
        if (threadOf) {
          data.threadOf = threadOf;
        }
        return {
          url: `${modalName}${id}`,
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: {
            ...data,
          },
        };
      },
      invalidatesTags: ["productComments"],
    }),
    deleteProductComment: builder.mutation({
      query: ({ modalName, componentId, commentId, authorId, token }) => ({
        url: `${modalName}${componentId}/comment/${commentId}?authorId=${authorId}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["productComments"],
    }),
  }),
});

export const {
  useCreateProductCommentMutation,
  useGetProductCommentsQuery,
  useDeleteProductCommentMutation,
} = commentApi;
