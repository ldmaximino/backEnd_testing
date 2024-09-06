//Local imports
import ProductDaoMongoDB from './mongodb/product_dao.js';
import ProductDaoFS from './filesystem/product_dao.js';
import CartDaoMongoDB from './mongodb/cart_dao.js';
import CartDaoFS from './filesystem/cart_dao.js';
import UserDaoMongoDB from './mongodb/user_dao.js';
import UserDaoFS from './filesystem/user_dao.js';
import TicketDaoMongoDB from './mongodb/ticket_dao.js';
import TicketDaoFS from './filesystem/ticket_dao.js';
import { initMongoDB } from '../../db/connection_mongodb.js';
import { initFS } from '../../db/connection_fs.js';

const PERSISTENCE = process.argv[2];

let productDao = null;
let cartDao = null;
let userDao = null;
let ticketDao = null;

let persistence = PERSISTENCE;

switch (persistence) {
  case "fs":
    initFS();
    productDao = new ProductDaoFS("./src/daos/filesystem/data/products.json");
    cartDao = new CartDaoFS("./src/daos/filesystem/data/carts.json");
    userDao = new UserDaoFS("./src/daos/filesystem/data/users.json");
    ticketDao = new TicketDaoFS("./src/daos/filesystem/data/tickets.json");
    break;
  case "mongodb":
    initMongoDB();
    userDao = new UserDaoMongoDB();
    productDao = new ProductDaoMongoDB();
    cartDao = new CartDaoMongoDB();
    ticketDao = new TicketDaoMongoDB();
    break;
  default:
    productDao = new ProductDaoFS("./src/daos/filesystem/data/products.json");
    cartDao = new CartDaoFS("./src/daos/filesystem/data/carts.json");
    userDao = new UserDaoFS("./src/daos/filesystem/data/users.json");
    ticketDao = new TicketDaoFS("./src/daos/filesystem/data/tickets.json");
    break;
}

export default { productDao, cartDao, userDao, ticketDao };
