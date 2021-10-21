import { useContext } from "react";
import "./App.scss";
import { LoginBox } from "./componentes/LoginBox";
import { MessageList } from "./componentes/MessageList";
import { SendMessageForm } from "./componentes/SendMessageForm";
import { AuthContext } from "./context/auth";
export function App() {
  const { user } = useContext(AuthContext);

  return (
    <main className={`contentWrapper ${!!user ? "contentSigned" : ""}`}>
      <MessageList></MessageList>
      {!!user ? <SendMessageForm /> : <LoginBox />}
    </main>
  );
}
