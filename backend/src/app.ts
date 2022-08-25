import 'express-async-errors';
import 'dotenv/config';
import express from "express";
import cors from "cors";
import { createServer } from "http";
import routes from './routes';
import treatErrors from './middleware/treatErrors';
import { startInstanceSocket } from './socket';

const app = express();
app.use(express.json());
app.use(cors());
app.use(treatErrors);

app.use(routes);

const server = createServer(app);
startInstanceSocket(server);

const PORT = process.env.APP_PORT || 3333;

server.listen(PORT, () => {
   console.log("Application running on port: 3333 🚀");
});
