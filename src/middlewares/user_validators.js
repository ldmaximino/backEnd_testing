import { httpResponse } from "../utils/httpResponse.js";

export const userValidator = (req, res, next) => {
  const errorUserValid = [];
  if (!req.body.first_name) errorUserValid.push("The first_name field is required");
  if (!req.body.last_name) errorUserValid.push("The last_name field is required");
  if (!req.body.email) errorUserValid.push("The email field is required");
  if (!req.body.password) errorUserValid.push("The password field is required");
  if(errorUserValid.length > 0) return httpResponse.validatorUsers(res, errorUserValid);
  next();
};
