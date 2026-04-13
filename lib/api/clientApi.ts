import { api } from "./api";
import { User } from "@/types/users/user";

export const register = async (data: { email: string; password: string }) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

export const login = async (data: { email: string; password: string }) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

export const logout = async () => {
  await api.post("/auth/logout");
};

export const checkSession = async (): Promise<User | null> => {
  try {
    const res = await api.get("/auth/session");
    return res.data || null;
  } catch {
    return null;
  }
};

export const getMe = async (): Promise<User> => {
  const res = await api.get("/users/me");
  return res.data;
};

export const updateMe = async (data: { username: string }) => {
  const res = await api.patch("/users/me", data);
  return res.data;
};