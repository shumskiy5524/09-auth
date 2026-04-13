import axios from "axios";
import { cookies } from "next/headers";
import { api } from "./api";

const baseURL = process.env.NEXT_PUBLIC_API_URL + "/api";

function getServerApi() {
  const cookieStore = cookies();

  return axios.create({
    baseURL,
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
}


export async function checkSession() {
  const api = getServerApi();
  const res = await api.get("/auth/session");
  return res.data;
}


export async function getMe() {
  const api = getServerApi();
  const res = await api.get("/users/me");
  return res.data;
}


export const fetchNotes = (params?: {
  search?: string;
  page?: number;
  perPage?: number;
  tag?: string;
}) => api.get("/notes", { params });

export async function fetchNoteById(id: string) {
  const api = getServerApi();
  const res = await api.get(`/notes/${id}`);
  return res.data;
}