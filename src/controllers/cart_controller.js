//Local imports
import Controllers from "./class.controller.js";
import CartService from "../services/cart_services.js";
import ProductService from "../services/product_services.js";
import { httpResponse } from "../utils/httpResponse.js";

const cartService = new CartService();
const productService = new ProductService();

export default class CartController extends Controllers {
  constructor() {
    super(cartService);
  }

  async getAllCarts(req, res, next) {
    try {
      const carts = await cartService.getAllCarts();
      if (carts.length > 0) {
        return httpResponse.Ok(res, carts);
      } else return httpResponse.Not_Found(res, "There are not carts");
    } catch (error) {
      next(error);
    }
  }

  async getCartById(req, res, next) {
    try {
      const cid = req.user.cart;
      const cart = await cartService.getCartById(cid);
      if (!cart) return httpResponse.Not_Found(res, "Cart not found");
      return httpResponse.Ok(res, cart);
    } catch (error) {
      next(error);
    }
  }

  async createCart(req, res, next) {
    try {
      const cart = await cartService.createCart();
      return httpResponse.Ok(res, cart);
    } catch (error) {
      next(error);
    }
  }

  async saveProductToCart(req, res, next) {
    try {
      const cid = req.user.cart;
      const { pid } = req.params;
      const productExist = await productService.getById(pid);
      if (!productExist)
        return httpResponse.Not_Found(res, "Product not found"); //if the product doesn't exist on db
      const cartExist = await cartService.getCartById(cid);
      if (!cartExist) return httpResponse.Not_Found(res, "Cart not found"); //if the cart doesn't exist on db
      if(req.user.email === productExist.owner ) return httpResponse.Forbidden(res, "User with 'premium' role cannot add a product created by himself"); //User with 'premium' role cannot add a product created by himself
      const addProductCart = await cartService.saveProductToCart(cid, pid);
      return httpResponse.Ok(res, addProductCart);
    } catch (error) {
      next(error);
    }
  }

  async updateCartWithProducts(req, res, next) {
    try {
      const cid = req.user.cart;
      const cartExist = await cartService.getCartById(cid);
      if (!cartExist) return httpResponse.Not_Found(res, "Cart not found"); //if the cart doesn't exist on db
      const updateCartWithProd = await cartService.updateCartWithProducts(
        cid,
        req.body
      );
      return httpResponse.Ok(res, updateCartWithProd);
    } catch (error) {
      next(error);
    }
  }

  async updateProductQuantity(req, res, next) {
    try {
      const cid = req.user.cart;
      const { pid } = req.params;
      const { quantity } = req.body;
      const cartExist = await cartService.getCartById(cid);
      if (!cartExist) return httpResponse.Not_Found(res, "Cart not found"); //if the cart doesn't exist on db

      //I had to make the find variable to search for the product in cart because in mongoose the '_id' exists and in fs it does not.
      let productExistInCart = "";
      if (process.argv[2] === "mongodb") {
        productExistInCart = cartExist.products.find(
          (prod) => prod.product._id.toString() === pid
        );
      } else if (process.argv[2] === "fs") {
        productExistInCart = cartExist.products.find(
          (prod) => prod.product === pid
        );
      }

      if (!productExistInCart)
        return httpResponse.Not_Found(res, "Product doesn't exit in the cart"); //if the product doesn't exist in the cart
      const updateProdQuantity = await cartService.updateProductQuantity(
        cid,
        pid,
        quantity
      );
      return httpResponse.Ok(res, updateProdQuantity);
    } catch (error) {
      next(error);
    }
  }

  async deleteProductFromCart(req, res, next) {
    try {
      const cid = req.user.cart;
      const { pid } = req.params;
      const cartExist = await cartService.getCartById(cid);
      if (!cartExist) return httpResponse.Not_Found(res, "Cart not found"); //if the cart doesn't exist on db
      //I had to make the find variable to search for the product in cart because in mongoose the '_id' exists and in fs it does not.
      let productExistInCart = "";
      if (process.argv[2] === "mongodb") {
        productExistInCart = cartExist.products.find(
          (prod) => prod.product._id.toString() === pid
        );
      } else if (process.argv[2] === "fs") {
        productExistInCart = cartExist.products.find(
          (prod) => prod.product === pid
        );
      }

      if (!productExistInCart)
        return httpResponse.Not_Found(res, "Product doesn't exist in the cart"); //if the product doesn't exist in the cart
      const deleteProductFromCart = await cartService.deleteProductFromCart(
        cid,
        pid
      );
      return httpResponse.Ok(res, deleteProductFromCart);
    } catch (error) {
      next(error);
    }
  }

  async deleteAllProductsFromCart(req, res, next) {
    try {
      const cid = req.user.cart;
      const cartExist = await cartService.getCartById(cid);
      if (!cartExist) return httpResponse.Not_Found(res, "Cart not found"); //if the cart doesn't exist on db
      const productsExistInCart = cartExist.products.length;
      if (productsExistInCart === 0)
        return httpResponse.Not_Found(res, "Cart is empty");
      const deleteAllProductsFromCart =
        await cartService.deleteAllProductsFromCart(cid);
      return httpResponse.Ok(res,deleteAllProductsFromCart);
    } catch (error) {
      next(error);
    }
  }

  async deleteAllCarts(req, res, next) {
    try {
      const cartsDelete = await cartService.deleteAllCarts();
      return httpResponse.Ok(res, cartsDelete);
    } catch (error) {
      next(error);
    }
  }
}
