import { Schema, model } from "mongoose";

export const messagesCollectionName = "message";

export const messageSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    }
})

export const MessageModel = model(messagesCollectionName, messageSchema);
