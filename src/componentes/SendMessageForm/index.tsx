import { FormEvent, useContext, useState } from "react";
import { VscGithubInverted, VscSignOut } from "react-icons/vsc";
import { AuthContext } from "../../context/auth";
import { api } from "../../services/api";
import "./index.scss";

export function SendMessageForm() {
  const { user, signOut } = useContext(AuthContext);
  const [message, setMessage] = useState("");

  const handleSendMessage = async (event: FormEvent) => {
    event.preventDefault();
    if (!message.trim()) {
      return;
    }
    await api.post("messages", { message }).then((response) => {
      setMessage("");
    });
  };

  return (
    <div className="sendMessageFormWrapper">
      <button onClick={signOut} className="signOutButton">
        <VscSignOut size="32" />
      </button>

      <header className="userInformation">
        <div className="userImage">
          <img src={user?.avatar_url} alt={user?.login} />
        </div>
        <strong className="userName">{user?.name}</strong>
        <span className="userGithub">
          <VscGithubInverted size="16" />@{user?.login}
        </span>
      </header>
      <form onSubmit={handleSendMessage} className="sendMessageForm">
        <label htmlFor="message">Mensagem</label>
        <textarea
          name="message"
          id="message"
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Qual sua espectativa para o evento?"
          value={message}
        ></textarea>
        <button type="submit">Enviar mensagem</button>
      </form>
    </div>
  );
}
