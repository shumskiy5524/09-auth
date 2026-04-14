import { cookies } from "next/headers";

const baseURL = process.env.NEXT_PUBLIC_API_URL + "/api";

async function serverFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const cookieStore = await cookies();

  const res = await fetch(`${baseURL}${endpoint}`, {
    ...options,
    headers: {
      Cookie: cookieStore.toString(),
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch ${endpoint}: ${res.statusText}`);
  }

  return res.json();
}

type NotesQuery = {
  search?: string;
  page?: number;
  perPage?: number;
  tag?: string;
};

function buildQuery(params?: NotesQuery) {
  if (!params) return "";

  const filtered = Object.fromEntries(
    Object.entries(params)
      .filter(([, value]) => value !== undefined)
      .map(([key, value]) => [key, String(value)])
  );

  const queryString = new URLSearchParams(filtered).toString();

  return queryString ? `?${queryString}` : "";
}

export async function checkSession() {
  return serverFetch("/auth/session");
}

export async function getMe() {
  return serverFetch("/users/me");
}

export async function fetchNotes(params?: NotesQuery) {
  const query = buildQuery(params);
  return serverFetch(`/notes${query}`);
}

export async function fetchNoteById(id: string) {
  return serverFetch(`/notes/${id}`);
}