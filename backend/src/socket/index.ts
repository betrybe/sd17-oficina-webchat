import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

export let socketIO: Socket<
   DefaultEventsMap,
   DefaultEventsMap,
   DefaultEventsMap,
   any
>;

export let serverIO: Server<
   DefaultEventsMap,
   DefaultEventsMap,
   DefaultEventsMap,
   any
>;

export function startInstanceSocket(server: any) {
   const io = new Server(server, {
      cors: {
         origin: "*",
      },
   });

   io.on("connection", (socket) => {
      socketIO = socket;
   });

   serverIO = io;
}
