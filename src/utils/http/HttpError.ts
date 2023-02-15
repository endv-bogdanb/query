import { z } from "zod";

const httpErrorSchema = z.object({ data: z.object({ message: z.string() }) });

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
    return (error as HttpError)?.name === "HTTP_ERROR";
  };

  static isUnauthenticated = (error: unknown): boolean => {
    return this.isHttpError(error) && error.code === 401;
  };

  static getErrorMessage = (error: unknown) => {
    if (this.isHttpError(error)) {
      return error.message;
    }
    const parsedError = httpErrorSchema.safeParse(error);

    if (!parsedError.success) {
      return "Unknown";
    }

    const {
      data: {
        data: { message },
      },
    } = parsedError;

    return message;
  };
}
