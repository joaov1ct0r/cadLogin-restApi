export default class ForbiddenError extends Error {
  public readonly message: string;
  public readonly statusCode: number;

  constructor(message: string, statusCode: number = 403) {
    super(message);

    this.message = message;
    this.statusCode = statusCode;
  }
}
