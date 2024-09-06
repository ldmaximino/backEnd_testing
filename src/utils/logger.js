import winston, { format } from "winston";
import { ENV } from '../config/config.js';
const { timestamp, combine, colorize, printf } = format;

let loggerConfig = "";
if(ENV === "DEV") {
    loggerConfig = {
        format: combine(
            timestamp({format: 'DD-MM-YYYY HH:mm:ss'}),
            colorize(),
            printf((info) => `| ${info.level} | ${info.timestamp} | ${info.message} |`)
        ),
        transports: [
            new winston.transports.Console({ level: 'debug' }),
        ]
    }
} else if(ENV === "PROD") {
    loggerConfig = {
        format: combine(
            timestamp({format: 'DD-MM-YYYY HH:mm:ss'}),
            colorize(),
            printf((info) => `| ${info.level} | ${info.timestamp} | ${info.message} |`)
        ),
        transports: [
            new winston.transports.Console({ level: 'info' }),
            new winston.transports.File({
                level: 'error',
                filename: './logs/errors.log'
            })
        ]
    }
}

export const logger = winston.createLogger(loggerConfig);
