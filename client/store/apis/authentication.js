import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authenticationApi = createApi({
  reducerPath: "authenticationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_STRAPI_URL,
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: "/auth/local",
        method: "POST",
        body: { identifier: email, password },
      }),
    }),
    register: builder.mutation({
      query: ({ userName, email, password, firstName, lastName }) => ({
        url: "/auth/local/register",
        method: "POST",
        body: {
          firstName,
          lastName,
          username: userName,
          email,
          password,
        },
      }),
    }),
    deleteUser: builder.mutation({
      query: ({ id, token }) => ({
        url: `/users/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    createProfile: builder.mutation({
      query: ({ id, name, token }) => ({
        url: "/profiles",
        method: "POST",
        body: {
          data: {
            name,
            customer_id: String(id),
          },
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    findProfile: builder.query({
      query: (id) => ({
        url: `/profiles/${id}`,
      }),
    }),
    findMe: builder.mutation({
      query: (token) => ({
        url: "/users/me?populate=avatar",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getCustomers: builder.query({
      query: (query) => ({
        url: `users?${query}`,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useDeleteUserMutation,
  useCreateProfileMutation,
  useFindProfileQuery,
  useFindMeMutation,
  useGetCustomersQuery,
} = authenticationApi;
