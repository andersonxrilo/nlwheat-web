import { useContext } from "react";
import { VscGithubInverted } from "react-icons/vsc";
import { AuthContext } from "../../context/auth";

import "./index.scss";

export function LoginBox() {
  const { signInUrl, user } = useContext(AuthContext);

  return (
    <div className="loginBoxWrapper">
      <strong>Entre e compartilhe a sua mensagem</strong>
      <a href={signInUrl} className="signInWithGitHub">
        <VscGithubInverted size="24" />
        Entrar com Github
      </a>
    </div>
  );
}
