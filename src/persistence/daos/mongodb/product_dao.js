//Local imports
import MongoDao from "./mongo_dao.js";
import { ProductModel } from "./models/product_model.js";

export default class ProductDaoMongoDB extends MongoDao {
  constructor() {
    super(ProductModel);
  }

  async getAllProducts(page = 1, limit = 10, category, stock, sort) {
    try {
      const filterCategory = category ? { category: category } : {};
      const filterStock = stock ? { stock: { $gt: parseInt(stock) } } : {};
      const filter = {
        ...filterCategory,
        ...filterStock,
      };
      let sortBy = {};
      if (sort) sortBy.price = sort === "asc" ? 1 : sort === "desc" ? -1 : null;
      const products = await ProductModel.paginate(filter, {
        page,
        limit,
        sort: sortBy,
      });
      return products;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getProducts() {
    try {
      const products = await ProductModel.find({}).lean();
      return products;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getProductByCode(code) {
    try {
      const product = await ProductModel.findOne({ code });
      return product;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteAllProducts() {
    try {
      return await this.model.deleteMany();
    } catch (error) {
      throw new Error(error);
    }
  }
}
