//Third party imports
import { Router } from "express";
import passport from "passport";

//Local imports
import factory from "../persistence/daos/factory.js";
import UserService from "../services/user_services.js";
import { numberFormat } from "../utils/utils.js";
import { refreshToken } from "../middlewares/jwt.js";
import { logger } from "../utils/logger.js";

const router = Router();

const { productDao, cartDao } = factory;
const userService = new UserService();

//When loading the project, it shows the login screen
router.get("/", (req, res) => {
  res.redirect("/login");
});

////////////////////////////////// User Register and Login ///////////////////////////////
//User Register
router.get("/register", (req, res) => {
  res.render("register");
});

//User Login
router.get("/login", (req, res) => {
  res.render("login");
});

//Github Login
router.get("/login-github", async (req, res) => {
  //Redirect to '/products' (View Products)
  logger.warn('User logged with GitHub');
  res.redirect("products");
});

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) res.send(err);
    logger.warn(`User logged out`);
    res.redirect("/login");
  });
});

//View Error User Login
router.get("/user_login_error", (req, res) => {
  logger.error('User login error');
  res.render("user_login_error");
});

//View Message User Exist in User Register
router.get("/user_exist", (req, res) => {
  res.render("user_exist");
});

//View Message User Registered in User Register
router.get("/user_registered", (req, res) => {
  res.render("user_registered");
});

////////////////////////////////// Views Products and Cart ///////////////////////////////
//View Products
router.get("/products", refreshToken, passport.authenticate("current"), async (req, res) => {
  let dataUser = {};
  if (req.session.passport.user) {
    const user = await userService.getById(req.session.passport.user);
    if (user) {
      dataUser = {
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.role,
      };
    }
  }
  let products = await productDao.getAll();
  res.render("products", { products: products, dataUser });
});

//View One Cart
router.get("/cart/:cid", refreshToken, passport.authenticate("current"), async (req, res) => {
  const { cid } = req.params;
  let cartDetail = await cartDao.getCartById(cid);
  const products = cartDetail.products.map((obj) => {
    return {
      quantity: obj.quantity,
      title: obj.product.title,
      price: numberFormat(obj.product.price),
      totalItem: numberFormat(obj.product.price * obj.quantity),
      totalPrice: obj.product.price * obj.quantity,
    };
  });
  const totalAmount = numberFormat(
    products.reduce((total, curr) => total + curr.totalPrice, 0)
  );
  res.render("cart", { products, totalAmount });
});

////////////////////////////////// View Chat ///////////////////////////////
router.get("/chat", (req, res) => {
  res.render("chat");
});

export default router;
