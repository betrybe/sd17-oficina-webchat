import MessageModel from "../database/models/MessageModel";
import UserModel from "../database/models/UserModel";

export class MessageService {
   async create(message: string, userId: number) {
      const newMessage = await MessageModel.create({
         message,
         userId,
      });

      return newMessage;
   }

   async listAll() {
      const messages = await MessageModel.findAll({
         include: [{ model: UserModel, as: "user" }],
      });

      return messages;
   }
}
