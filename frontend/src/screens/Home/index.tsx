import { useEffect, useRef, useState } from "react";
import { FiLogOut, FiSend } from "react-icons/fi";
import { toast } from "react-toastify";
import io from "socket.io-client";
import { useAuth } from "../../hooks/auth";
import { api } from "../../services/api";
import styles from "./styles.module.scss";

const socket = io("http://localhost:3333");

export function Home() {
   const { signOut } = useAuth();
   const [isConnected, setIsConnected] = useState(false);
   const [message, setMessage] = useState("");
   const messagesEndRef = useRef<HTMLDivElement>(null);
   const name = localStorage.getItem("webchat@name");

   function scrollToBottom() {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
   }

   const lorem = `Lorem ipsum dolor, sit amet consectetur adipisicing elit.
   Inventore voluptatibus distinctio ducimus culpa quaerat
   eaque aperiam unde, nam quod ipsam quidem incidunt itaque
   illum perferendis praesentium! Saepe nihil veniam
   similique?`;

   const messages = [...Array(20).keys()].map((item, index) => ({
      id: index + 1,
      date: new Date().toLocaleString("pt-BR", {
         hour: "2-digit",
         minute: "2-digit",
      }),
      name: "Gabriel Novais",
      message: index < 18 ? "Hello World" : lorem,
      received: (index % 3) % 2,
   }));

   useEffect(() => {
      scrollToBottom();
   }, [messages]);

   useEffect(() => {
      socket.on("receiveMessage", (data) => {
         console.log('receiveMessage', data);
      });
   }, []);


   async function sendMessage(e: any) {
      e.preventDefault();
      await api.post("messages", { message });
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
                     Bem vindo(a) <br /> <b>{name}</b>
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
            <form className={styles.sendMessage}>
               <div className={styles.formGroup}>
                  <input
                     onChange={(evt) => setMessage(evt.target.value)}
                     type="text"
                     placeholder="Mensagem"
                     defaultValue={message}
                  />
                  <button onClick={sendMessage} disabled={!!!message.length}>
                     <FiSend />
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
}
