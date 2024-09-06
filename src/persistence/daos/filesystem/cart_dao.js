import fs from "fs";
import FSDao from "./fs_dao.js";
import { v4 as uuidv4 } from "uuid";
import { __dirname } from "../../../utils/utils.js";

const path = "./src/persistence/daos/filesystem/data/carts.json";

export default class CartsManager extends FSDao {
  constructor() {
    super(path);
  }

  async getAllCarts() {
    try {
      if (fs.existsSync(this.path)) {
        const carts = await fs.promises.readFile(this.path, "utf-8");
        return JSON.parse(carts);
      } else return [];
    } catch (error) {
      throw new Error(error);
    }
  }

  async getCartById(cid) {
    try {
      const carts = await this.getAllCarts();
      const cartExist = carts.find((ca) => ca.id === cid);
      if (!cartExist) return null;
      return cartExist;
    } catch (error) {
      throw new Error(error);
    }
  }

  async createCart(obj) {
    try {
      const cart = { id: uuidv4(), products: [] };
      const carts = await this.getAllCarts();
      carts.push(cart);
      await fs.promises.writeFile(this.path, JSON.stringify(carts));
      return { status: "Cart created", cart };
    } catch (error) {
      throw new Error(error);
    }
  }

  async saveProductToCart(cid, pid) {
    try {
      const cart = await this.getCartById(cid); //check if the cart exists
      if (!cart) throw new Error("Cart not found");
      const existProductIndex = cart.products.findIndex(
        (prod) => prod.product === pid
      );
      if (existProductIndex !== -1) {
        cart.products[existProductIndex].quantity++; //if the product exists in the cart, add 1 to the quantity
      } else {
        cart.products.push({
          product: pid,
          quantity: 1,
        }); //if the product doesn't exist in the cart, add it with quantity equal to 1
      }
      //All carts are updated
      const carts = await this.getAllCarts();
      const newCarts = carts.filter((ca) => ca.id !== cid); //A new array is generated that does not include the cart to which we added the product
      newCarts.push(cart); //the updated cart is added to the new cart array
      await fs.promises.writeFile(this.path, JSON.stringify(newCarts));
      return { status: "Product added to cart", cart };
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateProductQuantity(cid, pid, quantity) {
    try {
      const cart = await this.getCartById(cid); //check if the cart exists
      if (!cart) throw new Error("Cart not found");
      const existProductIndex = cart.products.findIndex(
        (prod) => prod.product === pid
      );
      if (existProductIndex !== -1) {
        cart.products[existProductIndex].quantity = quantity; //if the product exists in the cart, add the quantity
      } else {
        throw new Error("Product doesn't exist on the cart");
      }
      //All carts are updated
      const carts = await this.getAllCarts();
      const newCarts = carts.filter((ca) => ca.id !== cid); //A new array is generated that does not include the cart to which we added the product
      newCarts.push(cart); //the updated cart is added to the new cart array
      await fs.promises.writeFile(this.path, JSON.stringify(newCarts));
      return { status: "Quantity updated", cart };
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateCartWithProducts(cid, object) {
    try {
      const carts = await this.getAllCarts();
      const cartIndex = carts.findIndex((cart) => cart.id === cid);
      if (cartIndex === -1) throw new Error("Cart not found");
      const cart = carts[cartIndex];
      cart.products = object;
      carts[cartIndex] = cart;
      await fs.promises.writeFile(this.path, JSON.stringify(carts));
      return { status: "Products added to cart", cart };
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteProductFromCart(cid, pid) {
    try {
      const carts = await this.getAllCarts();
      const cartIndex = carts.findIndex((cart) => cart.id === cid);
      if (cartIndex === -1) throw new Error("Cart not found");
      const cart = carts[cartIndex];
      const existProduct = cart.products.find((prod) => prod.product === pid);
      if (!existProduct) throw new Error("Product doesn't exist in the cart");
      cart.products = cart.products.filter(
        (product) => product.product !== pid
      );
      carts[cartIndex] = cart;
      await fs.promises.writeFile(this.path, JSON.stringify(carts));
      return { status: "Product deleted from cart", cart };
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteAllProductsFromCart(cid) {
    try {
      const carts = await this.getAllCarts();
      const cartIndex = carts.findIndex((cart) => cart.id === cid);
      if (cartIndex === -1) throw new Error("Cart not found");
      carts[cartIndex].products = [];
      await fs.promises.writeFile(this.path, JSON.stringify(carts));
      return { status: "All products deleted from cart", carts};
    } catch (error) {
      throw new Error(error);
    }
  }
}
