import { TLoginReq, TLoginRes, TUsers } from "@models";
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./utils";

export const api = createApi({
  reducerPath: "api",
  baseQuery,
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
