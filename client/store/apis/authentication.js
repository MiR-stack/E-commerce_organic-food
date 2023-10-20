import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authenticationApi = createApi({
  reducerPath: "authenticationApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:1337/api" }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: "/auth/local",
        method: "POST",
        body: { identifier: email, password },
      }),
    }),
    register: builder.mutation({
      query: ({ name, email, password }) => ({
        url: "/auth/local/register",
        method: "POST",
        body: {
          username: name,
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
    // TODO:relation with user not working
    createProfile: builder.mutation({
      query: ({ id, firstName, lastName, token }) => ({
        url: "/profiles",
        method: "POST",
        body: {
          data: {
            customer_id: String(id),
            firstName,
            lastName,
            customer: {
              connect: [id],
            },
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
    findMe: builder.query({
      query: (token) => ({
        url: "/users/me",
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
  useFindMeQuery,
} = authenticationApi;
