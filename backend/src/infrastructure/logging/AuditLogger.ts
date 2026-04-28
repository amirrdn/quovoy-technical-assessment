import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/audit.log' })
  ],
});

export const auditLog = (username: string, activity: string, target: string) => {
  // Pattern: {username} + {trigger activity} + {id/code document/user/vault/owner}
  const message = `${username} ${activity} ${target}`;
  logger.info(message);
};
