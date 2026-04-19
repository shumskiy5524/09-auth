"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { useParams } from "next/navigation";
import Link from "next/link";
import { fetchNotes } from "@/lib/api/clientApi";
import type { Note } from "@/types/note";

import SearchBox from "@/components/SearchBox/SearchBox";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";

export default function Notes() {
  const params = useParams();
  const tagFromUrl = Array.isArray(params?.slug) ? params.slug[0] : "all";

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [debouncedSearch] = useDebounce(search, 500);

  const { data, isLoading, isError } = useQuery<Note[]>({
    queryKey: ["notes", debouncedSearch, page, tagFromUrl],
    queryFn: () =>
      fetchNotes({
        search: debouncedSearch,
        page,
        perPage: 12,
        tag: tagFromUrl === "all" ? undefined : tagFromUrl,
      }),
  });

  const notes = data ?? [];

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading notes</p>;

  return (
    <div>
      <SearchBox
        value={search}
        onChange={(val) => {
          setSearch(val);
          setPage(1);
        }}
      />

      <Link href="/notes/action/create">Create note</Link>

      {notes.length > 0 ? (
        <>
          <NoteList notes={notes} />


          <Pagination
            currentPage={page}
            totalPages={1}
            onPageChange={(newPage) => setPage(newPage)}
          />
        </>
      ) : (
        <p>No notes found</p>
      )}
    </div>
  );
}