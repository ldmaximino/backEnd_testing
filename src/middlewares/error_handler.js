import { logger } from "../utils/logger.js";

export const errorHandler = (error, req, res, next) => {
  logger.error(`error ${error.stack}`);
  const status = error.status || 500;
  res.status(status).send({ msg: error.message });
};
