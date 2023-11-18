import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const relation = "api::product.product:";

export const commentApi = createApi({
  reducerPath: "commentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_STRAPI_URL}/comments`,
  }),
  tagTypes: ["productComments"],
  endpoints: (builder) => ({
    getProductComments: builder.query({
      query: ({ id, url }) => ({
        url: `${relation}${id}?${url || ""}`,
      }),
      providesTags: ["productComments"],
    }),
    createProductComment: builder.mutation({
      query: ({ id, content, threadOf, token }) => {
        let data = { content };
        if (threadOf) {
          data.threadOf = threadOf;
        }
        return {
          url: `${relation}${id}`,
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
      query: ({ productId, commentId, authorId, token }) => ({
        url: `${relation}${productId}/comment/${commentId}?authorId=${authorId}`,
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
