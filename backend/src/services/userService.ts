import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../database/models/UserModel";
import AppError from "../errors/AppError";
import { IUser } from "../interfaces/IUser";

export class UserService {
   validateEmail = (email: string) =>
      String(email)
         .toLowerCase()
         .match(/\S+@\S+\.\S+/);

   async findById(id: number) {
      const user = await UserModel.findByPk(id, {
         attributes: { exclude: ["password"] },
      });

      if (!user) {
         throw new AppError("User does not exist", 404);
      }

      return user;
   }

   async findByEmail(email: string) {
      if (!this.validateEmail(email)) {
         throw new AppError('"email" must be a valid email', 400);
      }

      const user = await UserModel.findOne({
         where: { email },
      });

      return user;
   }

   async validateLogin(email: string, password: string) {
      if (!email || !password) {
         throw new AppError("All fields must be filled", 400);
      }

      const user = await this.findByEmail(email);

      if (!user) {
         throw new AppError("Incorrect email or password", 401);
      }

      const isEqualPassword = await bcryptjs.compare(password, user.password);

      if (!isEqualPassword) {
         throw new AppError("Incorrect email or password", 401);
      }

      return user;
   }

   async validateCreateNewUser(password: string, email: string) {
      if (!password || password.length < 6) {
         throw new AppError(
            '"password" length must be at least 6 characters long',
            400
         );
      }

      const user = await this.findByEmail(email);

      if (user) {
         throw new AppError("User already registered", 409);
      }
   }

   async create({ name, email, password }: IUser) {
      const secret = process.env.JWT_SECRET || 'webchat';

      await this.validateCreateNewUser(password, email);

      const user = await UserModel.create({
         name,
         email,
         password: bcryptjs.hashSync(password, 8),
      });

      const token = jwt.sign({expiresIn: '7d'}, secret, {
         subject: JSON.stringify({
            userId: user.id,
         }),
      });

      return { token, user };
   }

   async login(email: string, password: string) {
      const user = await this.validateLogin(email, password);
      const secret = process.env.JWT_SECRET as string;

      const token = jwt.sign({}, secret, {
         subject: JSON.stringify({
            userId: user.id,
         }),
      });

      return { token, user };
   }
}
