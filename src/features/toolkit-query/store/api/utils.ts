import { Mutex } from "async-mutex";
import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/dist/query";
import { refreshResSchema } from "@models";
import { TokenRegistry } from "@utils";

const mutex = new Mutex();

const authorisedQuery = fetchBaseQuery({
  baseUrl: "/api",
  prepareHeaders: (headers) => {
    headers.append("Authorization", `Bearer ${TokenRegistry.token}`);
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
            body: { refreshToken: TokenRegistry.refreshToken },
          },
          api,
          extraOptions,
        );

        const data = refreshResSchema.safeParse(refreshResult.data);

        if (data.success) {
          const {
            data: { token, refreshToken },
          } = data;

          TokenRegistry.token = token;
          TokenRegistry.refreshToken = refreshToken;
        } else {
          TokenRegistry.reset();
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
