"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api/serverApi";
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
    return <div className="p-4 text-center">Loading note...</div>;
  }

  if (isError || !data) {
    return <div className="p-4 text-red-500">Error loading note.</div>;
  }

  const note = data;

  return (
    <article className="max-w-2xl mx-auto p-6 bg-white shadow rounded-lg">
      <h1 className="text-3xl font-bold mb-4">{note.title}</h1>

      <div className="text-gray-600 mb-6 italic">
        Tag: {note.tag || "none"}
      </div>

      <div className="prose lg:prose-xl">
        <p>{note.content}</p>
      </div>

      <div className="mt-8 text-sm text-gray-400">
        Created: {new Date(note.createdAt).toLocaleDateString()}
      </div>
    </article>
  );
}