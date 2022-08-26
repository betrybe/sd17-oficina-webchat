import MessageModel from "../database/models/MessageModel";
import UserModel from "../database/models/UserModel";
import { serverIO, socketIO } from "../socket";

export class MessageService {
   async create(message: string, userId: number) {
      const newMessage = await MessageModel.create({
         message,
         userId,
      });

      const fullMessage = await MessageModel.findOne({
         where: { id: newMessage.id },
         include: [{ model: UserModel, as: "user", attributes: ["name"] }],
      });

      serverIO.emit("receiveMessage", fullMessage);

      return fullMessage;
   }

   async listAll() {
      const messages = await MessageModel.findAll({
         include: [{ model: UserModel, as: "user", attributes: ["name"] }],
      });

      return messages;
   }
}
