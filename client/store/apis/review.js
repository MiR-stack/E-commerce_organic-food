import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import qs from "qs";

const url = qs.stringify({
  populate: {
    profile: {
      populate: ["avatar"],
      fields: ["firstName", "lastName"],
    },
  },
  fields: ["rating", "review"],
  filters: {
    status: {
      $eq: "visible",
    },
  },
});
export const reviewApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_STRAPI_URL}/reviews`,
  }),
  endpoints: (builder) => ({
    getReviews: builder.query({
      query: ({ productId, limit }) => ({
        url: `?filters[product_id][$eq]=${productId}&pagination[limit]=${limit}&${url}`,
      }),
    }),
    createReview: builder.mutation({
      query: ({ token, product_id, rating, review }) => ({
        url: "",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: { data: { product_id, rating, review } },
      }),
    }),
  }),
});

export const { useCreateReviewMutation, useGetReviewsQuery } = reviewApi;
