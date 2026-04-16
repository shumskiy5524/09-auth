import { cookies } from "next/headers";
import type { Note } from "@/types/note";
import type { User } from "@/types/user";

const baseURL = process.env.NEXT_PUBLIC_API_URL + "/api";

type NotesQuery = {
  search?: string;
  page?: number;
  perPage?: number;
  tag?: string;
};

async function serverFetch<T>(url: string, options: RequestInit = {}): Promise<T> {
  const cookieStore = cookies();

  const res = await fetch(`${baseURL}${url}`, {
    ...options,
    headers: {
      Cookie: cookieStore.toString(),
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }

  return res.json();
}

export async function checkSession(): Promise<User> {
  return serverFetch<User>("/auth/session");
}

export async function getMe(): Promise<User> {
  return serverFetch<User>("/users/me");
}

export async function fetchNotes(params?: NotesQuery): Promise<Note[]> {
  const query = params
    ? "?" +
      new URLSearchParams(
        Object.fromEntries(
          Object.entries(params)
            .filter(([, v]) => v !== undefined)
            .map(([k, v]) => [k, String(v)])
        )
      ).toString()
    : "";

  return serverFetch<Note[]>(`/notes${query}`);
}

export async function fetchNoteById(id: string): Promise<Note> {
  return serverFetch<Note>(`/notes/${id}`);
}