//Local imports
import Controllers from "./class.controller.js";
import ProductService from "../services/product_services.js";
import { httpResponse } from "../utils/httpResponse.js";

const productService = new ProductService();

export default class ProductController extends Controllers {
  constructor() {
    super(productService);
  }
  
  //Mocking Product
  async createProductMock(req, res, next) {
    try {
      const { cant } = req.query;
      const product = await productService.createProductMock(cant);
      if (!product) return httpResponse.Not_Found(res, product);
      return httpResponse.Created(res, product);
    } catch (error) {
      next(error);
    }
  };
}
