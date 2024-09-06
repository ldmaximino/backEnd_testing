//Local imports
import { MessageModel } from "./models/message_dao.js";

export default class MessageDaoMongoDB {
  constructor() {}

  async getAllMessages() {
    try {
      const messages = await MessageModel.find();
      return messages;
    } catch (error) {
      throw new Error(error);
    }
  }

  async createMessage(object) {
    try {
      const message = await MessageModel.create(object);
      return message;
    } catch (error) {
      throw new Error(error);
    }
  }
}
