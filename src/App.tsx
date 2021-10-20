import "./App.scss";
import { LoginBox } from "./componentes/LoginBox";
import { MessageList } from "./componentes/MessageList";
export function App() {
  return (
    <main className="contentWrapper">
      <MessageList></MessageList>
      <LoginBox />
    </main>
  );
}
