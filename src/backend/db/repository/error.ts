type TRepositoryError =
  | "AuthenticationError"
  | "BadRequestError"
  | "NotFoundError"
  | "ServerError";

export class RepositoryError extends Error {
  public name: "RepositoryError";
  public code: number;
  public type: TRepositoryError;

  constructor(message: string, code: number, type: TRepositoryError) {
    super(message);
    this.name = "RepositoryError";
    this.code = code;
    this.type = type;
  }

  static isRespositoryError = (error: unknown): error is RepositoryError => {
    return (error as RepositoryError)?.name === "RepositoryError";
  };

  static toJson = (error: unknown) => {
    if (this.isRespositoryError(error)) {
      const { code, type, message } = error;
      return { code, type, message };
    }

    const { code, type, message } = new ServerError();
    return { code, type, message };
  };
}

export class ServerError extends RepositoryError {
  constructor() {
    super("Internal server error", 500, "ServerError");
  }
}

export class BadRequest extends RepositoryError {
  constructor(message: string) {
    super(message, 400, "BadRequestError");
  }
}

export class Unauthorized extends RepositoryError {
  constructor() {
    super("Unauthorized", 401, "AuthenticationError");
  }
}

export class NotFound extends RepositoryError {
  constructor(message: string) {
    super(message, 404, "NotFoundError");
  }
}

export class InvalidCredentials extends BadRequest {
  constructor() {
    super("Invalid credentials");
  }
}
