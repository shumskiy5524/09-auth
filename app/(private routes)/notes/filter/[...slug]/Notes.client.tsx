"use client";

import { useState, useEffect, useRef } from "react"; 
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api/clientApi";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import type { Note } from "@/types/note";

interface NotesClientProps {
  slug: string[];
}

export default function NotesClient({ slug }: NotesClientProps) {
  const router = useRouter();
  const isFirstRender = useRef(true);

 
  const pageIndex = slug.indexOf("page");
  const currentPage = pageIndex !== -1 ? parseInt(slug[pageIndex + 1]) : 1;

  const initialSearch = slug.includes("search")
    ? slug[slug.indexOf("search") + 1]
    : "";

  const tagFilter = slug.includes("tag")
    ? slug[slug.indexOf("tag") + 1]
    : "";

  const [search, setSearch] = useState(initialSearch);
  const [debouncedSearch, setDebouncedSearch] = useState(initialSearch);


  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
 
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    
    if (debouncedSearch !== initialSearch) {
      router.push(`/notes/filter/all/search/${debouncedSearch}/page/1`);
    }
  }, [debouncedSearch, router, initialSearch]);

  
  const { data, isLoading, isError } = useQuery<{
    notes: Note[];
    totalPages: number;
  }>({
    queryKey: ["notes", { page: currentPage, search: debouncedSearch, tag: tagFilter }],
    queryFn: () =>
      fetchNotes({
        page: currentPage,
        search: debouncedSearch,
        tag: tagFilter,
        perPage: 12,
      }),
  });

  const handlePageChange = (newPage: number) => {
    const searchPart = debouncedSearch ? `/search/${debouncedSearch}` : "";
    router.push(`/notes/filter/all${searchPart}/page/${newPage}`);
  };

  if (isLoading) return <div>Loading notes list...</div>;
  if (isError) return <div>Error loading notes.</div>;

  const notes = data?.notes || [];
  const totalPages = data?.totalPages || 1;

  return (
    <div className="container" style={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h1>My Notes</h1>
        <Link
          href="/notes/action/create"
          style={{
            padding: "10px 20px",
            background: "#0070f3",
            color: "white",
            borderRadius: "6px",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          + Create New Note
        </Link>
      </div>

      <SearchBox value={search} onChange={setSearch} />

      {notes.length > 0 ? (
        <>
          <NoteList notes={notes} />
         
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      ) : (
        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <p>{"No notes found."}</p>
        </div>
      )}
    </div>
  );
}