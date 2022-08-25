import { Request, Response } from "express";
import { IUser } from "../interfaces/IUser";
import { UserService } from "../services/userService";

export class UserController {
   private userService = new UserService();

   async login(request: Request, response: Response) {
      const { email, password } = request.body;

      const { token, name } = await this.userService.login(email, password);

      return response.status(200).send({ token, name });
   };

   async create(request: Request, response: Response) {
      const userData = request.body as IUser;
      const { token, name } = await this.userService.create(userData);

      response.status(201).send({ token, name });
   }
}
