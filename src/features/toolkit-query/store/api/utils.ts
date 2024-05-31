import { Mutex } from "async-mutex";
import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { refreshResSchema } from "@models";
import { tokenSlice } from "@utils";

const mutex = new Mutex();

const authorisedQuery = fetchBaseQuery({
  baseUrl: "/api",
  prepareHeaders: (headers) => {
    headers.append("Authorization", `Bearer ${tokenSlice.state.token}`);
    return headers;
  },
});

export const baseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await authorisedQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshResult = await authorisedQuery(
          {
            url: "/refresh",
            method: "POST",
            body: { refreshToken: tokenSlice.state.refreshToken },
          },
          api,
          extraOptions,
        );

        const data = refreshResSchema.safeParse(refreshResult.data);

        if (data.success) {
          const {
            data: { token, refreshToken },
          } = data;

          tokenSlice.dispatch({
            type: "set",
            payload: { token, refreshToken },
          });
        } else {
          tokenSlice.dispatch({ type: "reset" });
        }
      } finally {
        release();
      }
    }

    await mutex.waitForUnlock();
    result = await authorisedQuery(args, api, extraOptions);
  }

  return result;
};
