import { _Error } from './_error';

export class InternalError extends _Error {
  readonly statusCode: number = 500;

  constructor(message: string) {
    super(message, true);
  }
}
