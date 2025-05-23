import { createLogger, format, transports } from "winston";
import "winston-daily-rotate-file";

const getLogger = (fileName = "application") => {
  const isProduction = process.env.NODE_ENV === "production";

  const fileLogTransport = new transports.DailyRotateFile({
    filename: `logs/${fileName}-%DATE%.log`,
    datePattern: "YYYY-MM-DD",
    zippedArchive: true,
    maxSize: "20m",
    maxFiles: "30d",
    level: process.env.LOG_LEVEL || "info",
    handleExceptions: true,
    handleRejections: true,
  });

  const consoleTransport = new transports.Console({
    level: process.env.LOG_LEVEL || "info",
    handleExceptions: true,
    handleRejections: true,
    format: format.combine(
      format.colorize(),
      format.printf(({ level, message }) => `${level}: ${message}`)
    ),
  });

  const logger = createLogger({
    level: process.env.LOG_LEVEL || "info",
    format: format.combine(
      format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      format.errors({ stack: true }),
      format.splat(),
      format.printf(
        ({ level, message, label = process.env.NODE_ENV, timestamp }) =>
          `${timestamp} [${label}] ${level}: ${message}`
      )
    ),
    defaultMeta: { service: "Amazon-Price-Tracker" },
    transports: [consoleTransport, ...(isProduction ? [fileLogTransport] : [])],
    exitOnError: false,
  });

  return logger;
};

export { getLogger };
