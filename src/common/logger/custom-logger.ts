import pino from 'pino';
import { Injectable, LoggerService } from '@nestjs/common';
import pinoPretty from 'pino-pretty';

const prettyOptions = {
  colorize: true,
  translateTime: 'HH:MM:ss.l',
  singleLine: true,
  ignore: 'pid,hostname,req.headers,res.headers',
};

const pretty = pinoPretty({
  ...prettyOptions,
  messageFormat: (log, messageKey) => `hello ${log[messageKey]}`,
});

const pinoLogger = pino({ level: 'info' }, pretty);

@Injectable()
export class CustomLogger implements LoggerService {
  log(message: any, ...optionalParams: any[]) {
    pinoLogger.info(message, ...optionalParams);
  }

  error(message: any, ...optionalParams: any[]) {
    pinoLogger.error(message, ...optionalParams);
  }

  warn(message: any, ...optionalParams: any[]) {
    pinoLogger.warn(message, ...optionalParams);
  }

  debug?(message: any, ...optionalParams: any[]) {
    pinoLogger.debug(message, ...optionalParams);
  }

  verbose?(message: any, ...optionalParams: any[]) {
    pinoLogger.trace(message, ...optionalParams);
  }
}
