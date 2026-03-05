import { createContext } from "react";
import type { UserSignup, UserLogin, User } from "../types/User";

export type UserContextType = {
  token: string | null;
  user: User | null;
  signup: (user: UserSignup) => Promise<void>;
  login: (user: UserLogin) => Promise<void>;
  logout: () => void;
  isLoggedIn: boolean;
};

export const UserContext = createContext<UserContextType | null>(null);
