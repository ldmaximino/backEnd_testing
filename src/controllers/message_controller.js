//Local imports
import * as service from "../services/message_services.js";

export const getAllMessages = async () => {
  try {
    const messages = await service.getAllMessages();
    return messages;
  } catch (error) {
    throw new Error(error);
  }
};

export const createMessage = async (object) => {
  try {
    const message = await service.createMessage(object);
    return message;
  } catch (error) {
    throw new Error(error);
  }
};
