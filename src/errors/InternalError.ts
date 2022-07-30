export default class InternalError extends Error {
  public readonly statusCode: number;

  public readonly message: string;

  constructor(message: string, statusCode = 500) {
    super(message);

    this.message = message;

    this.statusCode = statusCode;
  }
}
