import winston from 'winston';
import fs from 'fs';
import path from 'path';

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4
};

const logDir = 'logs';
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const level = () => {
  const env = process.env.NODE_ENV || 'dev';
  const isDevelopment = env === 'dev';
  return isDevelopment ? 'debug' : 'error';
};

const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
);

const transports =
  process.env.LOGGING != 'TRUE'
    ? [
        new winston.transports.File({
          filename: path.join(logDir, '/error.log'),
          level: 'error',
          handleExceptions: true,
          maxsize: 5242880, // 5MB
          maxFiles: 5,
          zippedArchive: true
        })
      ]
    : [
        new winston.transports.Console(),
        new winston.transports.File({
          filename: path.join(logDir, '/log_dev.log'),
          handleExceptions: false,
          maxsize: 5242880, // 5MB
          maxFiles: 5
        })
      ];

const logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports
});
export default logger;
