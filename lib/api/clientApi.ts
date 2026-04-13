import { api } from "./api";
import type { Note, NewNote } from "@/types/note";
import type { User } from "@/types/users/user";



export const register = (data: { email: string; password: string }) =>
  api.post<User>("/auth/register", data).then((res) => res.data);

export const login = (data: { email: string; password: string }) =>
  api.post<User>("/auth/login", data).then((res) => res.data);

export const logout = () =>
  api.post("/auth/logout").then((res) => res.data);

export const checkSession = () =>
  api.get<User>("/auth/session").then((res) => res.data);



export const getMe = () =>
  api.get<User>("/users/me").then((res) => res.data);

export const updateMe = (data: {
  email?: string;
  username?: string;
  avatar?: string;
}) => api.patch<User>("/users/me", data).then((res) => res.data);



export const fetchNotes = (params?: {
  search?: string;
  page?: number;
  perPage?: number;
  tag?: string;
}) =>
  api.get<Note[]>("/notes", { params }).then((res) => res.data);

export const fetchNoteById = (id: string) =>
  api.get<Note>(`/notes/${id}`).then((res) => res.data);

export const createNote = (data: NewNote) =>
  api.post<Note>("/notes", data).then((res) => res.data);

export const deleteNote = (id: string) =>
  api.delete<Note>(`/notes/${id}`).then((res) => res.data);