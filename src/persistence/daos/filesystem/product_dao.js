import FSDao from './fs_dao.js';
import { __dirname } from '../../../utils/utils.js';
const path = `./src/persistence/daos/filesystem/data/products.json`;

export default class ProductDaoFS extends FSDao {
  constructor() {
    super(path);
  }
}
