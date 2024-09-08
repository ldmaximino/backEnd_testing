//Local imports
import MongoDao from "./mongo_dao.js";
import { CartModel } from "./models/cart_model.js";

export default class CartDaoMongoDB extends MongoDao {
  constructor() {
    super(CartModel);
  }

  async getAllCarts() {
    try {
      const carts = await CartModel.find({}).populate("products.product");
      return carts;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getCartById(id) {
    try {
      const cart = await CartModel.findById(id).populate("products.product");
      return cart;
    } catch (error) {
      throw new Error(error);
    }
  }

  async createCart(object) {
    try {
      const cart = await CartModel.create(object);
      return { status: "Cart added", cart };
    } catch (error) {
      throw new Error(error);
    }
  }

  async saveProductToCart(cid, pid) {
    try {
      // Method of updating cart products using Mongoose's FindOneAndUpdate
      const cart = await CartModel.findOneAndUpdate(
        { _id: cid, "products.product": pid },
        { $inc: { "products.$.quantity": 1 } },
        { new: true }
      );

      if (!cart) {
        // Product not found, so add product to the cart
        const updatedCart = await CartModel.findByIdAndUpdate(
          cid,
          { $push: { products: { product: pid, quantity: 1 } } },
          { new: true }
        );
        return { status: "Cart updated", updatedCart };
      } else {
        return { status: "Product added to cart", cart };
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateProductQuantity(cid, pid, quantity) {
    try {
      // Method of updating cart products using Mongoose's FindOneAndUpdate
      const cartToUpdate = await CartModel.findOneAndUpdate(
        { _id: cid, "products.product": pid },
        { $set: { "products.$.quantity": quantity } },
        { new: true }
      );
      return { status: "Quantity updated", cartToUpdate };
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateCartWithProducts(cid, object) {
    try {
      // Method of updating cart products using Mongoose's FindOneAndUpdate
      const cartToAddProducts = await CartModel.findOneAndUpdate(
        { _id: cid },
        { $set: { products: object } },
        { new: true }
      );
      return { status: "Products added to cart", cartToAddProducts };
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteProductFromCart(cid, pid) {
    try {
      const deleteProduct = await CartModel.findOneAndUpdate(
        { _id: cid },
        { $pull: { products: { product: pid } } },
        { new: true }
      );
      return { status: "Product deleted", deleteProduct };
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteAllProductsFromCart(cid) {
    try {
      const deleteAllProducts = await CartModel.findOneAndUpdate(
        { _id: cid },
        { $set: { products: [] } },
        { new: true }
      );
      return { status: "All products deleted from cart", deleteAllProducts };
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteAllCarts() {
    try {
      return await this.model.deleteMany();
    } catch (error) {
      throw new Error(error);
    }
  }
}
