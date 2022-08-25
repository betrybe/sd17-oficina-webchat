import { Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

export let io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;

export function startInstanceSocket(server: any) {
   io = new Server(server, {
      cors: {
         origin: "*",
      },
   });
}
