import { TLoginUser } from "@components";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TokenRegistry } from "@utils";
import { string } from "zod";

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
    login: builder.mutation<{ token: string }, TLoginUser>({
      query: (user) => {
        return {
          url: "login",
          method: "POST",
          body: JSON.stringify(user),
        };
      },
    }),
    users: builder.query<
      { id: string; name: string; username: string }[],
      void
    >({
      query: () => {
        return {
          url: "users",
        };
      },
    }),
  }),
});

export const { useLoginMutation, useUsersQuery, useLazyUsersQuery } = api;
