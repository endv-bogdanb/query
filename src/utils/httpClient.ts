export class HttpError extends Error {
  public name = "HTTP_ERROR";

  constructor(
    public message: string,
    public code: number,
    public status: string
  ) {
    super(message);
  }

  static isHttpError = (error: unknown): error is HttpError => {
    return (error as HttpError).name === "HTTP_ERROR";
  };
}

function parseJson(txt: string) {
  try {
    if (txt.length > 0) {
      return JSON.parse(txt);
    }
    throw new Error();
  } catch (e) {
    throw new HttpError(
      "Could not parse the response",
      422,
      "Unprocessable Entity"
    );
  }
}

export async function httpClient(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<unknown> {
  const promise = fetch(input, init);

  let timer: number | NodeJS.Timeout;

  const timeoutPromise = new Promise<never>((_, reject) => {
    timer = setTimeout(() => {
      reject(new HttpError("Timeout", 504, "Gateway Timeout"));
    }, 10 * 1000);
  });

  promise.finally(() => {
    if (timer) {
      console.log("clearing timer finally ", input);
      clearTimeout(timer);
    }
  });

  const response = await Promise.race([promise, timeoutPromise]);

  const txt = await response.text();

  if (response.ok && response.headers.get("content-type")?.includes("json")) {
    return parseJson(txt);
  } else if (response.ok) {
    return txt;
  }

  const json = parseJson(txt);

  throw new HttpError(json.message, response.status, response.statusText);
}
