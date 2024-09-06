import { logger } from "../utils/logger.js";

export const initFS = () => {
  try {
    logger.info("Connected to FS 🔥🔥");
  } catch (error) {
    logger.error(`${error}😡`);
  }
};
