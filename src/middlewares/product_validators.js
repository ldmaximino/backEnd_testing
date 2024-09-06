import { httpResponse } from "../utils/httpResponse.js";

export const productValidator = (req, res, next) => {
  const errorProdValid = [];
  if (!req.body.title) errorProdValid.push("The title field is required");
  if (!req.body.description) errorProdValid.push("The description field is required");
  if (!req.body.code) errorProdValid.push("The code field is required");
  if (!req.body.price) errorProdValid.push("The price field is required");
  if (!req.body.stock && req.body.stock !== 0) errorProdValid.push("The stock field is required");
  //The quantity to be added to stock must be 0 or greater (it cannot be negative)
  if (req.body.stock < 0) errorProdValid.push("The stock field must be greater than or equal to zero");
  if (!req.body.category) errorProdValid.push("The category field is required");
  if(errorProdValid.length > 0) return httpResponse.validatorProducts(res, errorProdValid);
  next();
};
