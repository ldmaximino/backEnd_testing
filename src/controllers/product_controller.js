//Local imports
import Controllers from "./class.controller.js";
import ProductService from "../services/product_services.js";
import { PORT } from '../config/config.js';
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

  async getAllProducts(req, res, next) {
    try {
      const { page, limit, category, stock, sort } = req.query;
      const products = await productService.getAllProducts(
        page,
        limit,
        category,
        stock,
        sort
      );
      const nextPage = products.hasNextPage
        ? `http://localhost:${PORT}/api/products?page=${products.nextPage}`
        : null;
      const prevPage = products.hasPrevPage
        ? `http://localhost:${PORT}/api/products?page=${products.prevPage}`
        : null;
      res.status(200).json({
        status: "success",
        payload: products.docs,
        totalPages: products.totalPages,
        prevPage: products.prevPage,
        nextPage: products.nextPage,
        page: products.page,
        hasPrevPage: products.hasPrevPage,
        hasNextPage: products.hasNextPage,
        prevLink: prevPage,
        nextLink: nextPage,
        totalDocs: products.totalDocs, //este campo no lo solicitaba el ejercicio pero lo agregué para un mejor control de los filters
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteAllProducts(req, res, next) {
    try {
      const productsDelete = await productService.deleteAllProducts();
      return httpResponse.Ok(res, productsDelete);
    } catch (error) {
      next(error);
    }
  }
}
