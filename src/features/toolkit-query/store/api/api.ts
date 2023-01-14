import { createApi } from "@reduxjs/toolkit/query/react";
import { TLoginReq, TLoginRes, TUser, TUsers } from "@models";
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
    userById: builder.query<TUser, { id: string }>({
      query: (params) => {
        return {
          url: `users/${params.id}`,
        };
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useUsersQuery,
  useLazyUsersQuery,
  useUserByIdQuery,
  useLazyUserByIdQuery,
} = api;
