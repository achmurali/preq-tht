/* eslint-disable no-console */
import chalk from 'chalk';

const LOGLEVEL: { [level in ImportMetaEnv['VITE_LOG_LEVEL'] as Uppercase<level>]: number } = {
  DEBUG: 0,
  INFO: 1,
  WARNING: 2,
  ERROR: 3,
};

class _Logger {
  static logLevel: number;

  static initialize() {
    console.log(import.meta.env);

    this.logLevel =
      LOGLEVEL[import.meta.env.VITE_LOG_LEVEL.toUpperCase() as Uppercase<ImportMetaEnv['VITE_LOG_LEVEL']>] ??
      LOGLEVEL.INFO;

      return this;
  }

  static debug(...messages: unknown[]) {
    if (Logger.logLevel <= LOGLEVEL.DEBUG) {
      console.log(chalk.blue('[DEBUG]'), ...messages.map((str) => str));
    }
  }

  static info(...messages: string[]) {
    if (Logger.logLevel <= LOGLEVEL.INFO) {
      console.log(chalk.green('[INFO]'), ...messages.map((str) => str));
    }
  }

  static warning(...messages: string[]) {
    if (Logger.logLevel <= LOGLEVEL.WARNING) {
      console.warn(chalk.yellow('[WARNING]'), ...messages.map((str) => str));
    }
  }

  static error(...messages: string[]) {
    if (Logger.logLevel <= LOGLEVEL.ERROR) {
      console.error(chalk.red('[ERROR]'), ...messages.map((str) => str));
    }
  }
}

export const Logger = _Logger.initialize();
