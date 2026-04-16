import { cookies } from "next/headers";
import { api } from "./api";
import type { Note } from "@/types/note";
import type { User } from "@/types/user";

type NotesQuery = {
  search?: string;
  page?: number;
  perPage?: number;
  tag?: string;
};

const getCookieHeader = () => {
  return cookies().toString();
};

export const checkSession = async () => {
  return api.get<User>("/auth/session", {
    headers: {
      Cookie: getCookieHeader(),
    },
  });
};

export const getMe = async () => {
  return api.get<User>("/users/me", {
    headers: {
      Cookie: getCookieHeader(),
    },
  });
};

export const fetchNotes = async (params?: NotesQuery) => {
  return api.get<Note[]>("/notes", {
    params,
    headers: {
      Cookie: getCookieHeader(),
    },
  });
};

export const fetchNoteById = async (id: string) => {
  return api.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: getCookieHeader(),
    },
  });
};