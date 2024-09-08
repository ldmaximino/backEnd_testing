//Third party imports
import { Router } from "express";
import passport from "passport";

//Local imports
import { productValidator } from "../middlewares/product_validators.js";
import ProductController from "../controllers/product_controller.js";
import { refreshToken } from "../middlewares/jwt.js";
import { checkRole } from "../middlewares/checkRole.js";

const controller = new ProductController();
const router = Router();

router.get(
  "/",
  [refreshToken, passport.authenticate("current")],
  controller.getAllProducts
);

router.get(
  "/:pid",
  [refreshToken, passport.authenticate("current")],
  controller.getById
);

router.post(
  "/",
  [refreshToken, passport.authenticate("current"), productValidator, checkRole],
  controller.create
);

router.post("/mockingproducts", passport.authenticate("current"), controller.createProductMock);

router.put(
  "/:pid",
  [refreshToken, passport.authenticate("current"), productValidator, checkRole],
  controller.update
);

router.delete(
  "/:pid",
  [refreshToken, passport.authenticate("current"), checkRole],
  controller.delete
);

//delete all products - This endpoint doesn't use middleware because it is used inside test.js within the before sentence.
router.delete(
  "/",
  controller.deleteAllProducts
);

export default router;
