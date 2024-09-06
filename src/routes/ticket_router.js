//Third party imports
import { Router } from "express";
import passport from "passport";

//Local imports
import TicketController from "../controllers/ticket_controller.js";
import { refreshToken } from "../middlewares/jwt.js";

const controller = new TicketController();
const router = Router();

//Create Ticket
router.post(
    "/purchase",
    [refreshToken, passport.authenticate("current")],
    controller.createTicket
  );

export default router;
