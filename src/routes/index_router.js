//Third party imports
import { Router } from "express";

//Local imports
import productRouter from "./product_router.js";
import cartRouter from "./cart_router.js";
import userRouter from "./user_router.js";
import viewRouter from "./views_router.js";
import sessionsRouter from "./sessions_router.js";
import ticketRouter from "./ticket_router.js";
import loggerRouter from "./logger_router.js";

export default class MainRouter {
  constructor() {
    this.router = Router();
    this.init();
  }

  init() {
    this.router.use("/api/products", productRouter);
    this.router.use("/api/carts", cartRouter);
    this.router.use("/users", userRouter);
    this.router.use("/", viewRouter);
    this.router.use("/api/sessions", sessionsRouter);
    this.router.use("/api/tickets", ticketRouter);
    this.router.use("/loggertest", loggerRouter);
  }

  getRouter() {
    return this.router;
  }
}
