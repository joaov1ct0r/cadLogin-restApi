export default class InternalError {
  public readonly statusCode: number;

  public readonly message: string;

  constructor(message: string, statusCode = 500) {
    this.message = message;

    this.statusCode = statusCode;
  }
}
