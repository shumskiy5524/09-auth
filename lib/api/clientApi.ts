import { api } from "./api";
import type { Note, NewNote } from "@/types/note";
import type { User } from "@/types/user";



export const register = async (data: { email: string; password: string }) => {
  const { data: user } = await api.post<User>("/auth/register", data);
  return user;
};

export const login = async (data: { email: string; password: string }) => {
  const { data: user } = await api.post<User>("/auth/login", data);
  return user;
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

export const updateMe = async (data: { username?: string }) => {
  const { data: user } = await api.patch<User>("/users/me", data);
  return user;
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

export const createNote = async (data: NewNote) => {
  const { data: note } = await api.post<Note>("/notes", data);
  return note;
};

export const deleteNote = async (id: string) => {
  const { data: note } = await api.delete<Note>(`/notes/${id}`);
  return note;
};