import { api } from "./api";
import type { Note, NewNote } from "@/types/note";
import type { User } from "@/types/user";


export const register = async (payload: { email: string; password: string }) => {
  const { data } = await api.post<User>("/auth/register", payload);
  return data;
};

export const login = async (payload: { email: string; password: string }) => {
  const { data } = await api.post<User>("/auth/login", payload);
  return data;
};

export const logout = async () => {
  await api.post("/auth/logout");
};

export const checkSession = async () => {
  const { data } = await api.get<User>("/auth/session");
  return data;
};

export const getMe = async () => {
  const { data } = await api.get<User>("/users/me");
  return data;
};

export const updateMe = async (payload: { username?: string }) => {
  const { data } = await api.patch<User>("/users/me", payload);
  return data;
};


export const fetchNotes = async (params?: {
  search?: string;
  page?: number;
  perPage?: number;
  tag?: string;
}) => {
  const { data } = await api.get<Note[]>("/notes", { params });
  return data; 
};

export const fetchNoteById = async (id: string) => {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
};

export const createNote = async (payload: NewNote) => {
  const { data } = await api.post<Note>("/notes", payload);
  return data;
};

export const deleteNote = async (id: string) => {
  const { data } = await api.delete<Note>(`/notes/${id}`);
  return data;
};