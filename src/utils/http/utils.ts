import { z } from "zod";
import { HttpError } from "./HttpError";

function hasJsonResponse(response: Response): boolean {
  return response.headers.get("content-type")?.includes("json") ?? false;
}

export async function parseResponse(response: Response) {
  try {
    let json: null | unknown = null;
    const txt = await response.text();

    const isJsonResponse = hasJsonResponse(response);

    if (isJsonResponse && txt.length > 0) {
      json = JSON.parse(txt);
    } else if (isJsonResponse) {
      throw new Error();
    }

    return { txt, json };
  } catch (e) {
    throw new HttpError(
      "Could not parse the response",
      422,
      "Unprocessable Entity"
    );
  }
}

const errorJsonSchema = z.object({ message: z.string() });

export function httpErrorMessage({
  txt,
  json,
}: {
  txt: string;
  json: unknown;
}): string {
  const errorJson = errorJsonSchema.safeParse(json);
  if (errorJson.success) {
    return errorJson.data.message;
  } else if (json === null || json === undefined) {
    return txt;
  } else {
    return JSON.stringify(json);
  }
}

export function setRafTimeout<T extends (...args: any[]) => void>(
  func: T,
  delay: number,
  ...args: Parameters<typeof func>
) {
  // @ts-expect-error
  const context = this;

  const rafTimeout: { id: null | number } = { id: null };
  const start = performance.now();

  const cancel = () => {
    if (rafTimeout.id === null || rafTimeout.id === undefined) {
      return;
    }
    cancelAnimationFrame(rafTimeout.id);
  };

  const loop: FrameRequestCallback = (timestamp) => {
    const elapsed = timestamp - start;

    cancel();

    if (elapsed < delay) {
      rafTimeout.id = requestAnimationFrame(loop);
    } else {
      func.apply(context, args);
    }
  };

  rafTimeout.id = requestAnimationFrame(loop);

  return cancel;
}
