//Local imports
import MessageDaoMongoDB from "../persistence/daos/mongodb/message_dao.js";

const messageDao = new MessageDaoMongoDB();

export const getAllMessages = async () => {
  try {
    const messages = await messageDao.getAllMessages();
    return messages;
  } catch (error) {
    throw new Error(error);
  }
};

export const createMessage = async (object) => {
  try {
    const message = await messageDao.createMessage(object);
    return message;
  } catch (error) {
    throw new Error(error);
  }
};
