import { useEffect, useRef, useState } from "react";
import { FiLogOut, FiSend } from "react-icons/fi";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import { useAuth } from "../../hooks/auth";
import { api } from "../../services/api";
import styles from "./styles.module.scss";

interface IMessage {
   id: number;
   date: string;
   name: string;
   message: string;
   received: boolean;
}

const socket = io("http://localhost:3333");

export function Home() {
   const { signOut, user } = useAuth();
   const inputRef = useRef<HTMLInputElement>(null);
   const messagesEndRef = useRef<HTMLDivElement>(null);
   const [messages, setMessages] = useState<IMessage[]>([] as IMessage[]);

   useEffect(() => {
      async function loadMessages() {
         const { data } = await api.get("/messages");
         const messagesFormatted = data.map((item: any) => ({
            id: item.id,
            date: new Date(item.createdAt).toLocaleString("pt-BR", {
               hour: "2-digit",
               minute: "2-digit",
            }),
            name: item.user.name,
            message: item.message,
            received: Number(user.id) === item.userId,
         }));

         setMessages(messagesFormatted);
      }

      loadMessages();
   }, []);

   useEffect(() => {
      scrollToBottom();
   }, [messages]);

   useEffect(() => {
      socket.on("connect", () => {
         console.log(`Socket ${socket.id}`);
      });

      socket.on("receiveMessage", (data) => {
         const newMessage = {
            id: data.id,
            date: new Date(data.createdAt).toLocaleString("pt-BR", {
               hour: "2-digit",
               minute: "2-digit",
            }),
            name: data.user.name,
            message: data.message,
            received: Number(user.id) === data.userId,
         };

         setMessages((messages) => [...messages, newMessage]);
      });

      return () => {
         socket.off("connect");
         socket.off("receiveMessage");
      };
   }, []);

   function scrollToBottom() {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
   }

   async function sendMessage(e: any) {
      e.preventDefault();
      try {
         const message = inputRef.current?.value;
         if (!message) {
            toast.warning("Informe uma mensagem");
            return;
         }
         await api.post("/messages", { message });
         inputRef.current.value = "";
         inputRef.current.focus();
         scrollToBottom();
      } catch (error) {
         toast.warning("Sessão expirada, realize o login novamente.");
         signOut();
      }
   }

   return (
      <div className="container">
         <div className={`${styles.content} content`}>
            <span className={styles.logout} onClick={signOut}>
               <FiLogOut />
            </span>
            <div className={styles.welcome}>
               <h1>Chat expresso 17</h1>
               <div>
                  <p>
                     Bem vindo(a) <br /> <b>{user.name}</b>
                  </p>
               </div>
            </div>
            <div className={`${styles.messages} space-y-2 grid grid-cols-1`}>
               {messages.map((item) => {
                  return (
                     <div
                        key={item.id}
                        className={`${
                           item.received ? "place-self-end" : "place-self-start"
                        }`}
                     >
                        <div
                           className={`${styles.message} rounded-3xl ${
                              item.received
                                 ? "rounded-tr-none"
                                 : "rounded-tl-none"
                           }`}
                        >
                           <div className={styles.header}>
                              <p>{item.name}</p>
                              <small>{item.date}</small>
                           </div>
                           {item.message}
                        </div>
                     </div>
                  );
               })}
               <div ref={messagesEndRef} />
            </div>

            <form onSubmit={sendMessage} className={styles.sendMessage}>
               <div className={styles.formGroup}>
                  <input ref={inputRef} placeholder="Mensagem" />
                  <button type="submit">
                     <FiSend />
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
}
