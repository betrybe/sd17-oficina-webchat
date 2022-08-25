import { Router } from "express";
import { UserController } from "../controllers/userController";

const userRoutes = Router();
const userController = new UserController();

userRoutes.post("/", (req, res) => userController.login(req, res));
userRoutes.post("/register", (req, res) => userController.create(req, res));

export default userRoutes;
