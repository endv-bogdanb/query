import { TLoginUser } from "@components";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    login: builder.mutation<unknown, TLoginUser>({
      query: (user) => {
        return {
          url: "login",
          method: "POST",
          body: JSON.stringify(user),
        };
      },
    }),
  }),
});

export const { useLoginMutation } = api;
