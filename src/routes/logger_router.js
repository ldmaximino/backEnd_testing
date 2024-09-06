//Third party imports
import { Router } from "express";
import passport from "passport";

//Local imports
import { refreshToken } from "../middlewares/jwt.js";
import { logger } from "../utils/logger.js";
import { ENV } from "../config/config.js";

const router = Router();

//Test Logs
router.get("/",[refreshToken, passport.authenticate("current")], (req,res) => {
    logger.silly('log silly')
    logger.debug('log debug')
    logger.verbose('log verbose')
    logger.info('log info')
    logger.http('log http')
    logger.warn('log warn')
    logger.error('log error')
    if(ENV === "DEV") return res.json({message: 'Return since debug'});
    return res.json({message: 'Return since info'});
});

export default router;
