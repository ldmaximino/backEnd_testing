//Third party imports
import { Router } from "express";
import passport from "passport";

//Local imports
import MockingController from "../controllers/mocking_controller.js";
import { refreshToken } from "../middlewares/jwt.js";

const controller = new MockingController();
const router = Router();

//Create Ticket
router.post("/mockingproducts",[refreshToken, passport.authenticate("current")], controller.createProductMock);

export default router;
