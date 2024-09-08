//Local imports
import Services from "./class.services.js";
import factory from "../persistence/daos/factory.js";
const { cartDao } = factory;

export default class CartServices extends Services {
  constructor() {
    super(cartDao);
  }
  async getAllCarts() {
    try {
      return await this.dao.getAllCarts();
    } catch (error) {
      throw new Error(error);
    }
  }

  async getCartById(cid) {
    try {
      return await this.dao.getCartById(cid);
    } catch (error) {
      throw new Error(error);
    }
  }

  async createCart(object) {
    try {
      return await this.dao.createCart(object);
    } catch (error) {
      throw new Error(error);
    }
  }

  async saveProductToCart(cid, pid) {
    try {
      return await this.dao.saveProductToCart(cid, pid);
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateCartWithProducts(cid, object) {
    try {
      return await this.dao.updateCartWithProducts(cid, object);
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateProductQuantity(cid, pid, quantity) {
    try {
      return await this.dao.updateProductQuantity(cid, pid, quantity);
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteProductFromCart(cid, pid) {
    try {
      return await this.dao.deleteProductFromCart(cid, pid);
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteAllProductsFromCart(cid) {
    try {
      return await this.dao.deleteAllProductsFromCart(cid);
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteAllCarts() {
    try {
      return await this.dao.deleteAllCarts();
    } catch (error) {
      throw new Error(error);
    }
  }
}
