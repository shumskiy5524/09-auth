import { cookies } from 'next/headers';
import { api } from './api';
import type { Note } from '@/types/note';
import type { User } from '@/types/user';
import type { AxiosResponse } from 'axios';

type NotesQuery = {
  search?: string;
  page?: number;
  perPage?: number;
  tag?: string;
};

const getCookieHeader = async () => {
  const cookieStore = await cookies();
  return cookieStore.toString();
};

export const checkSession = async (): Promise<AxiosResponse<User>> => {
  const response = await api.get<User>('/auth/session', {
    headers: {
      Cookie: await getCookieHeader(),
    },
  });

  return response;
};

export const getMe = async (): Promise<User> => {
  const { data } = await api.get<User>('/users/me', {
    headers: {
      Cookie: await getCookieHeader(),
    },
  });

  return data;
};

export const fetchNotes = async (params?: NotesQuery): Promise<Note[]> => {
  const { data } = await api.get<Note[]>('/notes', {
    params,
    headers: {
      Cookie: await getCookieHeader(),
    },
  });

  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await api.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: await getCookieHeader(),
    },
  });

  return data;
};