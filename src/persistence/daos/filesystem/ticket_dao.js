import FSDao from './fs_dao.js';
import { __dirname } from '../../../utils/utils.js';

const path = `./src/persistence/daos/filesystem/data/ticket.json`;

export default class TicketDaoFS extends FSDao {
  constructor() {
    super(path);
  }
}
