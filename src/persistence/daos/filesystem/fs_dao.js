import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import { logger } from "../../../utils/logger.js";

export default class FSDao {
  constructor(path) {
    this.path = path;
  }

  async getAll() {
    try {
      if (fs.existsSync(this.path)) {
        const items = await fs.promises.readFile(this.path, "utf-8");
        const itemsJSON = JSON.parse(items);
        return itemsJSON;
      } else {
        return [];
      }
    } catch (error) {
      logger.error(error);
    }
  }

  async getById(id) {
    try {
      const items = await this.getAll();
      const item = items.find((it) => it.id === id);
      return item;
    } catch (error) {
      log.error(error);
    }
  }

  async create(obj) {
    try {
      const itemsFile = await this.getAll();
      const itemExist = itemsFile.find((item) => item.code === obj.code);
      if (itemExist) return `Code ${obj.code} already exist`;
      const item = { id: uuidv4(), ...obj };
      itemsFile.push(item);
      await fs.promises.writeFile(this.path, JSON.stringify(itemsFile));
      return item;
    } catch (error) {
      logger.error(error);
    }
  }

  async update(id, obj) {
    try {
      const itemsFile = await this.getAll();
      const itemExist = itemsFile.find((item) => item.id === id);
      if (!itemExist) return `Id ${id} doesn't exist`;
      const index = itemsFile.findIndex((item) => item.id === id);
      if (index === -1) {
        throw new Error(`Id ${id} not found`);
      } else {
        itemsFile[index] = { ...obj, id };
      }
      await fs.promises.writeFile(this.path, JSON.stringify(itemsFile));
      return obj;
    } catch (error) {
      logger.error(error);
    }
  }

  async delete(id) {
    try {
      const itemsFile = await this.getAll();
      const itemExist = itemsFile.find((item) => item.id === id);
      if (!itemExist) return `Id ${id} doesn't exist`;
      if (itemsFile.length > 0) {
        const newArray = itemsFile.filter((item) => item.id !== id);
        await fs.promises.writeFile(this.path, JSON.stringify(newArray));
        return `Id ${id} deleted`;
      } else {
        throw new Error(`Item id: ${id} not found`);
      }
    } catch (error) {
      logger.error(error);
    }
  }

  async getProductByCode(code) {
    try {
      const products = await this.getAll();
      const productExist = products.find((prod) => prod.code === code);
      return productExist;
    } catch (error) {
      logger.error(error);
    }
  }

  async getAllProducts() {
    try {
      const products = await this.getAll();
      return products;
    } catch (error) {
      logger.error(error);
    }
  }
}
