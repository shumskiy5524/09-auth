"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api/clientApi";
import type { Note } from "@/types/note";

export default function Notes() {
  const { data, isLoading, isError } = useQuery<Note[]>({
    queryKey: ["notes"],
    queryFn: () => fetchNotes(),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading notes</p>;

  return (
    <ul>
      {data?.map((note) => (
        <li key={note.id}>
          <strong>{note.title}</strong>
        </li>
      ))}
    </ul>
  );
}