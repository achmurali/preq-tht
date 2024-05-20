import { _Error } from './_error';

export class HttpError extends _Error {
  readonly statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message, false);
    this.statusCode = statusCode;
  }
}
