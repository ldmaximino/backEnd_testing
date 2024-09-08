//Local imports
import Controllers from "./class.controller.js";
import UserService from "../services/user_services.js";
import { httpResponse } from "../utils/httpResponse.js";
import { logger } from "../utils/logger.js";
import { sendEMailToUser } from "../services/mailing_services.js";

const userService = new UserService();

export default class UserController extends Controllers {
  constructor() {
    super(userService);
  }

  async registerResponse(req, res, next) {
    try {
      logger.warn(`New user registered`);
      if (req.headers["user-agent"].slice(0, 7) === "Postman" || req.headers["x-requested-from"] === "swagger") {
        return httpResponse.Ok(res, 'User created');
      } else {
        return res.redirect("/user_registered");
      }
    } catch (error) {
      next(error);
    }
  }

  async loginJwt(req, res, next) {
    try {
      const user = await userService.login(req.body);
      if (!user) {
        if (req.headers["user-agent"].slice(0, 7) === "Postman" || req.headers["x-requested-from"] === "swagger") {
          return httpResponse.Not_Found(res, 'User not exists');
        } else return res.redirect("/user_login_error");
      }
      logger.warn(`User ${user.email} logged in`);
      const token = userService.generateToken(user);
      res.cookie("token", token, { httpOnly: true });
      if (req.headers["user-agent"].slice(0, 7) === "Postman" || req.headers["x-requested-from"] === "swagger") {
        return httpResponse.Ok(res, user);
      } else return res.redirect("/products");
    } catch (error) {
      next(error);
    }
  }

  async currentSession(req, res, next) {
    try {
      if (req.user) {
        const id = req.user._id || req.user.id;
        const user = await userService.getUserById(id);
        return httpResponse.Ok(res, user);
      }
    } catch (error) {
      next(error);
    }
  }

  async generateNewPass(req, res, next) {
    try {
      const user = req.user;
      const token = await userService.generateNewPass(user);
      if (token) {
        await sendEMailToUser(user, "resetPass", token);
        res.cookie("tokenpass", token);
        return httpResponse.Ok(
          res,
          "Email sent to the user to change the password."
        );
      } else {
        return httpResponse.Not_Found(
          res,
          "The email to change the password could not be sent."
        );
      }
    } catch (error) {
      next(error);
    }
  }

  async updatePass(req, res, next) {
    try {
      const user = req.user;
      const { password } = req.body;
      const { tokenpass } = req.cookies;
      if (!tokenpass) return httpResponse.Not_Found(res, "You must generate the reset of your password");
      const updatePassword = await userService.updatePass(password, user);
      if (!updatePassword) return httpResponse.Forbidden(res, "Password cannot be the same as last one entered.");
      res.clearCookie("tokenpass");
      return httpResponse.Ok(res, "Pasword updated");
    } catch (error) {
      next(error);
    }
  }

  async changeUserRole(req, res, next) {
    try {
      const user = req.user;
      if(user.role !== "user" && user.role !== "premium") return httpResponse.Forbidden(res, "Only users with 'user' and 'premium' roles can change their role");
      const changeRol = await userService.changeUserRole(user);
      return httpResponse.Ok(res, `User role changed from '${user.role}' to '${changeRol.role}'`);
    } catch (error) {
      next(error);
    }
  }

  async deleteAllUsers(req, res, next) {
    try {
      const usersDelete = await userService.deleteAllUsers();
      return httpResponse.Ok(res, usersDelete);
    } catch (error) {
      next(error);
    }
  }
}
