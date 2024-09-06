//Third party imports
import { Server } from "socket.io";

//Local imports
import * as message_controller from "./controllers/message_controller.js";
import { logger } from "./utils/logger.js";

export const initSocketServer = (httpServer) => {
  const socketServer = new Server(httpServer);

  socketServer.on("connection", async (socket) => {
    logger.info(`👌 New connection (Id connection: ${socket.id})`);
    socketServer.emit("messages", await message_controller.getAllMessages()); //Send to all clients

    socket.on("disconnect", () => {
      logger.info("🫸 User disconnected!");
    });

    socket.on("newUser", (user) => {
      logger.info(`> ${user} has logged in`);
      socket.broadcast.emit("newUser", user);
    });

    socket.on("chat:message", async (msg) => {
      await message_controller.createMessage(msg);
      socketServer.emit("messages", await message_controller.getAllMessages()); //Send to all clients
    });

    socket.on("chat:typing", (data) => {
      socket.broadcast.emit("chat:typing", data);
    });
  });
};
