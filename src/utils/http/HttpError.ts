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
    } else if (
      error !== null &&
      typeof error === "object" &&
      "data" in error &&
      error.data !== null &&
      typeof error.data === "object" &&
      "message" in error.data &&
      typeof error.data.message === "string"
    ) {
      return error.data.message;
    }
    return "Unknown";
  };
}
