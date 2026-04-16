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

const getCookieHeader = () => cookies().toString();


export const checkSession = async (): Promise<User> => {
  const { data } = await api.get<User>("/auth/session", {
    headers: {
      Cookie: getCookieHeader(),
    },
  });

  return data;
};


export const getMe = async (): Promise<User> => {
  const { data } = await api.get<User>("/users/me", {
    headers: {
      Cookie: getCookieHeader(),
    },
  });

  return data;
};


export const fetchNotes = async (params?: NotesQuery): Promise<Note[]> => {
  const { data } = await api.get<Note[]>("/notes", {
    params,
    headers: {
      Cookie: getCookieHeader(),
    },
  });

  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await api.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: getCookieHeader(),
    },
  });

  return data;
};