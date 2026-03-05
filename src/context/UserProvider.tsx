import { useState } from "react";
import { UserContext, type UserContextType } from "./UserContext";
import * as userService from "../services/userService";
import type { UserSignup, UserLogin, User } from "../types/User";

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token"),
  );
  const [user, setUser] = useState<User | null>(null);

  const signup = async (user: UserSignup) => {
    await userService.signup(user);
  };

  const login = async (loginInfo: UserLogin) => {
    const { token, user } = await userService.login(loginInfo);
    localStorage.setItem("token", token);
    setToken(token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  const isLoggedIn = !!token;

  const value: UserContextType = {
    token,
    signup,
    login,
    user,
    logout,
    isLoggedIn,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
