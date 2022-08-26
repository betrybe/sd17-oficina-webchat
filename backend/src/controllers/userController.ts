import { Request, Response } from "express";
import { IUser } from "../interfaces/IUser";
import { UserService } from "../services/userService";

export class UserController {
   private userService = new UserService();

   async login(request: Request, response: Response) {
      const { email, password } = request.body;

      const { token, user } = await this.userService.login(email, password);

      return response.status(200).send({ token, user });
   };

   async create(request: Request, response: Response) {
      const userData = request.body as IUser;
      const { token, user } = await this.userService.create(userData);

      response.status(201).send({ token, user });
   }
}
