
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

  const tagFromUrl =
    typeof params?.slug === "object" ? params.slug[0] : "all";

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [tag] = useState(tagFromUrl || "all");

  const [debouncedSearch] = useDebounce(search, 500);

  const { data, isLoading, isError } = useQuery<Note[]>({
    queryKey: ["notes", debouncedSearch, page, tag],
    queryFn: () =>
      fetchNotes({
        search: debouncedSearch,
        page,
        perPage: 12,
        tag: tag === "all" ? "" : tag,
      }),
  });

  const notes = data ?? [];

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

 
  const totalPages = notes.length === 12 ? page + 1 : page;

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading notes</p>;

  return (
    <div>
      <SearchBox value={search} onChange={handleSearchChange} />

      <Link href="/notes/action/create">Create note</Link>

      {notes.length > 0 && (
        <>
          <NoteList notes={notes} />

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}