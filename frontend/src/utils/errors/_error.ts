import { Logger } from '../logger';

export class _Error extends Error {
  readonly logThisError: boolean;

  constructor(message: string, logThisError: boolean = true) {
    super(message);

    this.name = this.constructor.name;
    this.logThisError = logThisError;
    Object.setPrototypeOf(this, new.target.prototype);

    if (logThisError) {
      Logger.debug('Error:', this.message, '\nStack:', this.stack);
    }
  }
}
