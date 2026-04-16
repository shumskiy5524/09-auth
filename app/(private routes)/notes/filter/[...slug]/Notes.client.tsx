"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api/clientApi";
import type { Note } from "@/types/note";

export default function Notes() {
  const [search] = useState("");
  const [page] = useState(1);
  const [tag] = useState("all");

  const { data, isLoading, isError } = useQuery<Note[]>({
    queryKey: ["notes", search, page, tag],
    queryFn: () =>
      fetchNotes({
        search,
        page,
        perPage: 12,
        tag: tag === "all" ? "" : tag,
      }),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading notes</p>;

  const notes = data ?? [];

  return (
    <ul>
      {notes.map((note) => (
        <li key={note.id}>
          <strong>{note.title}</strong>
        </li>
      ))}
    </ul>
  );
}