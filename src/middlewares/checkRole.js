import { httpResponse } from "../utils/httpResponse.js";

export const checkRole = (req, res, next) => {
  try {
    const { role } = req.user;
    if (role !== "admin" && role !== "premium")
      return httpResponse.Forbidden(res, "This endpoint is only for users with role 'admin' or 'premium'");
    else next();
  } catch (error) {
    next(error);
  }
};

export const checkRoleCarts = (req, res, next) => {
  try {
    const { role } = req.user;
    if (role !== "user" && role !== "premium")
      return httpResponse.Forbidden(res, "Only users with role 'user' or 'premium' can add products to the cart");
    else next();
  } catch (error) {
    next(error);
  }
};