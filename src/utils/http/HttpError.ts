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
}
