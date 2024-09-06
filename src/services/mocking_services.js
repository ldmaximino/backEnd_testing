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
