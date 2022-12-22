import { TLoginReq, TLoginRes, TUsers } from "@models";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TokenRegistry } from "@utils";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders: (headers) => {
      headers.append("Authorization", `Bearer ${TokenRegistry.token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<TLoginRes, TLoginReq>({
      query: (user) => {
        return {
          url: "login",
          method: "POST",
          body: JSON.stringify(user),
        };
      },
    }),
    users: builder.query<TUsers, void>({
      query: () => {
        return {
          url: "users",
        };
      },
    }),
  }),
});

export const { useLoginMutation, useUsersQuery, useLazyUsersQuery } = api;
