import { Injectable } from '@nestjs/common';
import { createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file';

interface LogContext {
  requestId?: string;
  userId?: string;
  [key: string]: any;
}

@Injectable()
export class LoggerService {
  private logger;

  constructor() {
    const fileTransport = new transports.DailyRotateFile({
      filename: 'logs/app-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    });

    const errorTransport = new transports.DailyRotateFile({
      filename: 'logs/error-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      level: 'error',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    });

    this.logger = createLogger({
      format: format.combine(
        format.timestamp(),
        format.errors({ stack: true }),
        format.json()
      ),
      transports: [
        fileTransport,
        errorTransport,
        new transports.Console({
          format: format.combine(
            format.colorize(),
            format.simple()
          )
        })
      ]
    });
  }

  private formatMessage(message: string, context?: LogContext) {
    return {
      message,
      ...context,
      timestamp: new Date().toISOString()
    };
  }

  log(message: string, context?: LogContext) {
    this.logger.info(this.formatMessage(message, context));
  }

  error(message: string, error?: Error, context?: LogContext) {
    this.logger.error(this.formatMessage(message, {
      ...context,
      stack: error?.stack
    }));
  }

  warn(message: string, context?: LogContext) {
    this.logger.warn(this.formatMessage(message, context));
  }

  debug(message: string, context?: LogContext) {
    this.logger.debug(this.formatMessage(message, context));
  }
}