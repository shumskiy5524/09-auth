"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api/clientApi"; 
import type { Note } from "@/types/note";

interface NoteDetailsProps {
  id: string;
}

export default function NoteDetails({ id }: NoteDetailsProps) {
  const { data, isLoading, isError } = useQuery<Note>({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  if (isLoading) {
    return <div>Loading note...</div>;
  }

  if (isError || !data) {
    return <div>Error loading note.</div>;
  }

  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.content}</p>
      <p>{data.tag}</p>
    </div>
  );
}