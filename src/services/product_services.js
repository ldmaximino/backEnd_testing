//Local imports
import Services from "./class.services.js";
import factory from "../persistence/daos/factory.js";
const { productDao } = factory;

//Mocking Products
import { ProductModel } from "../persistence/daos/mongodb/models/product_model.js";
import { addProduct } from "../faker/product_utils.js";

export default class ProductService extends Services {
  constructor() {
    super(productDao);
  }

  async getAllProducts(page, limit, category, stock, sort) {
    try {
      return await this.dao.getAllProducts(page, limit, category, stock, sort);
    } catch (error) {
      throw new Error(error);
    }
  }

  async getProductByCode(code) {
    try {
      return await this.dao.getProductByCode(code);
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteAllProducts() {
    try {
      return await this.dao.deleteAllProducts();
    } catch (error) {
      throw new Error(error);
    }
  }

  //Mocking Product
  async createProductMock(cant = 10) {
    try {
      const products = [];
      for (let i = 0; i < cant; i++) {
        const product = addProduct();
        products.push(product);
      }
      await ProductModel.deleteMany(); //delete all products before generate new mocking products
      return await ProductModel.create(products);
    } catch (error) {
      throw new Error(error);
    }
  }
}
