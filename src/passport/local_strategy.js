//Third party imports
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

//Local imports
import UserService from "../services/user_services.js";

const userService = new UserService();

const strategyConfig = {
  usernameField: "email",
  passwordField: "password",
  passReqToCallback: true,
};

export const register = async (req, email, password, done) => {
  try {
    const existUser = await userService.getUserByEmail(email);
    if (existUser) return done(null, false, { message: 'El usuario ya existe. No podrá ser creado.' }); //If it returns an email from a user that already exists, false is returned so that the user is not entered again
    const newUser = await userService.register(req.body);
    return done(null, newUser); //If the user's email does not exist in the database, then return newUser to register it
  } catch (error) {
    return done(error);
  }
};

export const login = async (req, email, password, done) => {
  try {
    const userLogin = await userService.login({ email, password });
    if (!userLogin) {
      req.session.destroy();
      return done(null, false);
    }
    return done(null, userLogin);
  } catch (error) {
    return done(error);
  }
};

const registerStrategy = new LocalStrategy(strategyConfig, register);
const loginStrategy = new LocalStrategy(strategyConfig, login);

passport.use("registerStrat", registerStrategy);
passport.use("loginStrat", loginStrategy);

passport.serializeUser((user, done) => {
  const userId = user._id || user.id
  return done(null, userId);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await userService.getById(id);
    return done(null, user);
  } catch (error) {
    return done(error);
  }
});
