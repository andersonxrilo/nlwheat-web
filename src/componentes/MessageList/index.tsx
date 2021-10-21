import { api } from "../../services/api";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "./index.scss";
import logoImg from "../../assets/logo.svg";
import { User } from "../../types/user";

type Message = {
  id: string;
  text: string;
  created_at: string;
  user: User;
};
const messagesQueue: Message[] = [];
const socket = io("http://localhost:4000");

socket.on("new_message", (newMessage) => {
  messagesQueue.push(newMessage);
});

export function MessageList() {
  const [messages, setMessage] = useState<Message[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (messagesQueue.length > 0) {
        setMessage((prevState) =>
          [messagesQueue[0], prevState[0], prevState[1]].filter(Boolean)
        );
        messagesQueue.shift();
      }
    }, 3000);
  }, []);

  useEffect(() => {
    api
      .get("messages/last3")
      .then((response) => {
        setMessage(response.data as Message[]);
      })
      .catch((err) => {
        console.log("Não conseguiu retornar mensagens da api");
      });
  }, []);
  return (
    <div className="messageListWrapper">
      <img src={logoImg} alt="" />
      <ul className="messageList">
        {messages.map((message, i) => {
          return (
            <li key={i} className="message">
              <p className="messageContent">{message.text}</p>
              <div className="messageUser">
                <div className="userImage">
                  <img src={message.user.avatar_url} alt={message.user.login} />
                </div>
                <span>@{message.user.login}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
