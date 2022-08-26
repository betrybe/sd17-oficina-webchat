import { Request, Response } from "express";
import { MessageService } from "../services/messageService";

export class MessageController {
   private messageService = new MessageService();

   async listAll(request: Request, response: Response) {
      const messages = await this.messageService.listAll();

      return response.status(200).send(messages);
   }

   async create(request: Request, response: Response) {
      const userId = request.userId;
      const { message } = request.body;
      await this.messageService.create(message, userId);

      response.status(201).send("ok");
   }
}
