//Third party imports
import mongoose from "mongoose";
import { URI_MONGODB_ATLAS, URI_MONGODB_LOCAL } from '../config/config.js';
import { logger } from "../utils/logger.js";

export const initMongoDB = async () => {
  try {
    const mongoUrl = URI_MONGODB_ATLAS || URI_MONGODB_LOCAL;
    mongoose.set("strictQuery", false);
    await mongoose.connect(mongoUrl);
    logger.info(`Connected to MongoDB 🔥🔥 => Source: ${mongoUrl}`);
  } catch (error) {
    logger.error(`${error}😡`);
  }
};
