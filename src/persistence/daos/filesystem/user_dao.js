import FSDao from './fs_dao.js';
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import { __dirname } from '../../../utils/utils.js';
import { logger } from '../../../utils/logger.js';

const path = `./src/persistence/daos/filesystem/data/users.json`;

export default class UserDaoFS extends FSDao {
  constructor() {
    super(path);
  }
  
  async getUserById(id) {
    try {
      const items = await this.getAll();
      const item = items.find((it) => it.id === id);
      return item;
    } catch (error) {
      logger.error(error);
    }
  }

  async register(obj) {
    try {
      console.log('');
      const item = { id: uuidv4(), ...obj };
      const itemsFile = await this.getAll();
      itemsFile.push(item);
      await fs.promises.writeFile(this.path, JSON.stringify(itemsFile));
      return item;
    } catch (error) {
      throw new Error(error);
    }
  }
  
  async getUserByEmail(email) {
    const users = await this.getAll();
    const userExist = users.find((user) => user.email === email);
    if(!userExist) return null
    return userExist;
  }
}
