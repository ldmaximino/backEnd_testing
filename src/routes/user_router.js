//Third party imports
import { Router } from "express";
import passport from "passport";

//Local imports
import UserController from "../controllers/user_controller.js";
import { refreshToken } from "../middlewares/jwt.js";
import { userValidator } from "../middlewares/user_validators.js";

const controller = new UserController();
const router = Router();

//Get all users
router.get(
  "/",[
  refreshToken,
  passport.authenticate("current") ],
  controller.getAll
);

//Get One user
router.get(
  "/:pid",[
  refreshToken,
  passport.authenticate("current") ],
  controller.getById
);

//Register User with passport local strategy
router.post("/register", userValidator, (req, res, next) => {
  passport.authenticate("registerStrat", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      if(req.headers["user-agent"].slice(0,7) === "Postman" || req.headers["x-requested-from"] === "swagger") {
        return res.status(400).json({ message: info.message });
      } else return res.redirect("/user_exist");      
    }
    return controller.registerResponse(req,res,next);
  })(req, res, next);
});

//Login with passport jwt strategy
router.post("/login", controller.loginJwt);

//Login with passport github strategy
router.get(
  "/register-github",
  passport.authenticate("github", { scope: ["user: email"] })
);

router.get(
  "/login-github",
  passport.authenticate("github", {
    failureRedirect: "/login",
    successRedirect: "/login-github",
    passReqToCallback: true,
  })
);

//delete all users - This endpoint doesn't use middleware because it is used inside test.js within the before sentence.
router.delete(
  "/",
  controller.deleteAllUsers
);

//Send Email to reset user password
router.post("/reset-pass", passport.authenticate('current'), controller.generateNewPass);

//Update user password sended
router.put("/update-pass", passport.authenticate('current'), controller.updatePass);

//Change user role - Param uid is not necessary because req.user is saved in loggin
router.put(
  "/premium",[
  refreshToken,
  passport.authenticate("current")],
  controller.changeUserRole
);

export default router;
