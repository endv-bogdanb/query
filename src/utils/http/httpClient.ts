import { Mutex } from "async-mutex";
import { refreshResSchema } from "@models";
import { tokenSlice } from "@utils/tokenSlice";
import { HttpError } from "./HttpError";
import { httpErrorMessage, parseResponse, setRafTimeout } from "./utils";

const mutex = new Mutex();

function makeTimeoutPromise() {
  let cancel: () => void | undefined;

  const timeoutPromise = new Promise<never>((_, reject) => {
    const error = new HttpError("Timeout", 504, "Gateway Timeout");
    const wait = 10 * 1000;
    cancel = setRafTimeout(reject, wait, error);
  });

  return Object.assign(timeoutPromise, {
    cancel: () => {
      cancel?.();
    },
  });
}

export async function httpClient(
  url: string,
  init?: RequestInit,
): Promise<unknown> {
  const contentTypeHeader = { ["content-type"]: "application/json" } as const;

  const headers = { ...contentTypeHeader, ...(init?.headers ?? {}) };

  const promise = fetch(url, { ...(init ?? {}), headers });

  const timeoutPromise = makeTimeoutPromise();

  promise.finally(timeoutPromise.cancel);

  const response = await Promise.race([promise, timeoutPromise]);

  const { txt, json } = await parseResponse(response);

  if (response.ok) {
    return json ?? txt;
  }

  const message = httpErrorMessage({ txt, json });

  throw new HttpError(message, response.status, response.statusText);
}

async function retryHttpClient(
  url: string,
  init: RequestInit,
): Promise<unknown> {
  try {
    // Waits for mutex to be available without locking
    await mutex.waitForUnlock();
    return await httpClient(url, init);
  } catch (e) {
    if (!HttpError.isUnauthenticated(e)) {
      throw e;
    }

    // Checks if mutex is locked
    if (!mutex.isLocked()) {
      // Locks the mutex
      const release = await mutex.acquire();
      try {
        const response = await httpClient("/api/refresh", {
          method: "POST",
          body: JSON.stringify({ refreshToken: tokenSlice.state.refreshToken }),
          headers: { Authorization: `Bearer ${tokenSlice.state.token}` },
        });

        const data = refreshResSchema.safeParse(response);

        if (!data.success) {
          tokenSlice.dispatch({ type: "reset" });
          throw new HttpError("Unauthorized", 401, "Unauthorized");
        }

        const {
          data: { token, refreshToken },
        } = data;

        tokenSlice.dispatch({
          type: "set",
          payload: {
            token,
            refreshToken,
          },
        });
      } catch (e) {
        tokenSlice.dispatch({ type: "reset" });
        throw e;
      } finally {
        // Unlocks the mutex
        release();
      }
    }

    // Waits for mutex to be available without locking
    await mutex.waitForUnlock();

    return await httpClient(url, {
      ...init,
      headers: {
        ...init.headers,
        Authorization: `Bearer ${tokenSlice.state.token}`,
      },
    });
  }
}

export async function authHttpClient(
  url: string,
  init?: RequestInit,
): Promise<unknown> {
  if (tokenSlice.state.token.length === 0) {
    throw new HttpError("Unauthorized", 401, "Unauthorized");
  }

  const headers = {
    Authorization: `Bearer ${tokenSlice.state.token}`,
    ...(init?.headers ?? {}),
  };

  return await retryHttpClient(url, { ...(init ?? {}), headers });
}
