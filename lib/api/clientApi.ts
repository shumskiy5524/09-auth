import type { Note, NewNote } from "@/types/note";
import type { User } from "@/types/user";

async function handleRequest<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  return response.json();
}

export const register = (data: { email: string; password: string }) =>
  handleRequest<User>("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const login = (data: { email: string; password: string }) =>
  handleRequest<User>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const logout = () =>
  handleRequest<void>("/api/auth/logout", { method: "POST" });

export const checkSession = () =>
  handleRequest<User>("/api/auth/session");

export const getMe = () =>
  handleRequest<User>("/api/users/me");

export const updateMe = (data: {
  email?: string;
  username?: string;
  avatar?: string;
}) =>
  handleRequest<User>("/api/users/me", {
    method: "PATCH",
    body: JSON.stringify(data),
  });

export const fetchNotes = (params?: {
  search?: string;
  page?: number;
  perPage?: number;
  tag?: string;
}) => {
  const query = params
    ? `?${new URLSearchParams(
        Object.entries(params)
          .filter(([, value]) => value !== undefined)
          .reduce((acc, [key, value]) => {
            acc[key] = String(value);
            return acc;
          }, {} as Record<string, string>)
      )}`
    : "";

  return handleRequest<Note[]>(`/api/notes${query}`);
};

export const fetchNoteById = (id: string) =>
  handleRequest<Note>(`/api/notes/${id}`);

export const createNote = (data: NewNote) =>
  handleRequest<Note>("/api/notes", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const deleteNote = (id: string) =>
  handleRequest<Note>(`/api/notes/${id}`, {
    method: "DELETE",
  });