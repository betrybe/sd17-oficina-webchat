import { Router } from "express";
import { MessageController } from "../controllers/messageController";
import ensureAuthenticated from "../middleware/ensureAuthenticated";

const messageRoutes = Router();
const messageController = new MessageController();

messageRoutes.get("/", (req, res) => messageController.listAll(req, res));
messageRoutes.post("/", ensureAuthenticated, (req, res) =>
   messageController.create(req, res)
);

export default messageRoutes;
