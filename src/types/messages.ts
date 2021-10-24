import { User } from "./user";

type Message = {
  id: string;
  text: string;
  created_at: string;
  user: User;
};

export type { Message };
