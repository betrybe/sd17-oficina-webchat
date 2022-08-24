import { useEffect, useRef } from "react";
import { FiSend } from "react-icons/fi";
import "./styles.scss";

export function Home() {
   const messagesEndRef = useRef<HTMLDivElement>(null);

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

   return (
      <div className="container">
         <div className="content">
            <h1>Chat expresso 17</h1>
            <div
               className="messages space-y-2 grid grid-cols-1"
            >
               {messages.map((item) => {
                  return (
                     <div
                        key={item.id}
                        className={`${
                           item.received ? "place-self-end" : "place-self-start"
                        }`}
                     >
                        <div
                           className={`message rounded-3xl ${
                              item.received
                                 ? "rounded-tr-none"
                                 : "rounded-tl-none"
                           }`}
                        >
                           <div className="header">
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
            <form className="send-message">
               <div className="form-group">
                  <input type="text" placeholder="Mensagem" />
                  <button>
                     <FiSend />
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
}
