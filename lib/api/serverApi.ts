import { api } from "./api";
import { cookies } from "next/headers";
import type { Note } from "@/types/note";
import type { User } from "@/types/user";

type NotesQuery = {
  search?: string;
  page?: number;
  perPage?: number;
  tag?: string;
};

export async function checkSession(): Promise<User> {
  const cookieStore = cookies();

  const res = await api.get("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res.data;
}

export async function getMe(): Promise<User> {
  const cookieStore = cookies();

  const res = await api.get("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res.data;
}

export async function fetchNotes(params?: NotesQuery): Promise<Note[]> {
  const cookieStore = cookies();

  const res = await api.get("/notes", {
    params,
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const cookieStore = cookies();

  const res = await api.get(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res.data;
}