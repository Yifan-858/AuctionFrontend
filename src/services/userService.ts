import { API_URL } from "./api";
import type { UserSignup } from "../types/User";
import type { UserLogin } from "../types/User";

export const signup = async (user: UserSignup) => {
  const res = await fetch(`${API_URL}/user/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!res.ok) {
    console.log(user);
    throw new Error("Signup failed");
  }
};

export const login = async (user: UserLogin) => {
  const res = await fetch(`${API_URL}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!res.ok) {
    console.log(user);
    throw new Error("Login failed");
  }

  const data = await res.json();
  return data;
};
