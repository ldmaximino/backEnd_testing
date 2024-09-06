//Third party imports
import { Router } from "express";
import passport from "passport";
import UserController from "../controllers/user_controller.js"

const router = Router();
const controller = new UserController();

//return current user
router.get("/current", passport.authenticate("current"),  controller.currentSession);

export default router;
