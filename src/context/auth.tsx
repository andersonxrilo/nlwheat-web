import { createContext, ReactNode, useEffect, useState } from "react";
import { User } from "../types/user";
import { api } from "../services/api";

type AuthContextData = {
  user: User | null;
  signInUrl: string;
  signOut: () => void;
};

type AuthResponse = {
  token: string;
  user: User;
};

export const AuthContext = createContext({} as AuthContextData);

type AuthProvider = {
  children: ReactNode;
};

export function AuthProvider(props: AuthProvider) {
  const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=fb39d8a24633b0551d31`;
  const [user, setUser] = useState<User | null>(null);

  const signOut = async () => {
    setUser(null);
    localStorage.removeItem("@dowhile:token");
  };
  const signIn = async (githubCode: string) => {
    const response = await api.post<AuthResponse>("authenticate", {
      code: githubCode,
    });
    const { token, user } = response.data;
    localStorage.setItem("@dowhile:token", token);
    setUser(user);
  };

  useEffect(() => {
    const token = localStorage.getItem("@dowhile:token");

    if (token) {
      api
        .get<User>("profile", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUser(response.data);
        });
    }
  }, []);

  useEffect(() => {
    const url = window.location.href;
    const hasGithubCode = url.includes("?code=");
    if (hasGithubCode) {
      const [urlnew, githubCode] = url.split("?code=");
      window.history.pushState({}, "", urlnew);
      signIn(githubCode);
    }
  }, []);
  return (
    <AuthContext.Provider value={{ user, signInUrl, signOut }}>
      {props.children}
    </AuthContext.Provider>
  );
}
