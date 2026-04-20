'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api/clientApi';
import type { Note } from '@/types/note';

type Props = {
  id: string;
};

export default function NotePreview({ id }: Props) {
  const { data, isLoading, isError } = useQuery<Note>({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError || !data) return <p>Error</p>;

  return (
    <div>
      <h2>{data.title}</h2>
      <p>{data.content}</p>
    </div>
  );
}