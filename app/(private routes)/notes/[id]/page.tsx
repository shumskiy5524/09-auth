"use client";

import { useQuery } from "@tanstack/react-query";
import type { Note } from "@/types/note";
import { fetchNoteById } from "@/lib/api/clientApi";

type Props = {
  id: string;
};

export default function NoteClient({ id }: Props) {
  const { data, isLoading, isError } = useQuery<Note>({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError || !data) return <p>Error</p>;

  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.content}</p>
    </div>
  );
}