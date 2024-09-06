//Third party imports
import { v4 as uuidv4 } from "uuid";

//Local imports
import Services from "./class.services.js";
import factory from "../persistence/daos/factory.js";

const { productDao, cartDao, ticketDao } = factory;

export default class TicketService extends Services {
  constructor() {
    super(ticketDao);
  }

  async createTicket(user) {
    try {
      const cartId = user.cart;
      const cart = await cartDao.getById(cartId);
      if (!cart) return null;
      let totalAmount = 0;
      let productsOutOfCart = [];
      if (cart.products.length > 0) {
        for (const prodInCart of cart.products) {
          const prodId = prodInCart.product;
          const product = await productDao.getById(prodId);
          if (product.stock >= prodInCart.quantity) {
            const amount = prodInCart.quantity * product.price;
            totalAmount += amount;
            //Update Stock
            product.stock = product.stock - prodInCart.quantity;
            await productDao.update(prodId, product);
          } else {
            productsOutOfCart.push(product.id);
          }
        }
      } else return { ticket: null, msg: 'There are no products in the cart'};

      if(totalAmount > 0) {
        const newTicket = await this.dao.create({
          code: uuidv4(),
          purchase_datetime: new Date().toLocaleString(),
          amount: totalAmount,
          purchaser: user.email,
        });
        await cartDao.deleteAllProductsFromCart(user.cart);
        return { ticket: newTicket, productsOutOfCart };
      } else return { ticket: null, productsOutOfCart };
     
    } catch (error) {
      throw new Error(error);
    }
  }
}
