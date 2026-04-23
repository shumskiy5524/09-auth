"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api/clientApi";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";

interface NotesClientProps {
  slug: string[];
}

export default function NotesClient({ slug }: NotesClientProps) {
  const router = useRouter();


  const pageIndex = slug.indexOf("page");
  const currentPage =
    pageIndex !== -1 ? parseInt(slug[pageIndex + 1]) : 1;

  const initialSearch = slug.includes("search")
    ? slug[slug.indexOf("search") + 1]
    : "";

  const tagFilter = slug.includes("tag")
    ? slug[slug.indexOf("tag") + 1]
    : "";

  
  const [search, setSearch] = useState(initialSearch);
  const [debouncedSearch, setDebouncedSearch] =
    useState(initialSearch);

  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  
  useEffect(() => {
    router.push(
      `/notes/filter/all/search/${debouncedSearch}/page/1`
    );
  }, [debouncedSearch, router]);

  
  const { data, isLoading, isError } = useQuery({
    queryKey: [
      "notes",
      { page: currentPage, search: debouncedSearch, tag: tagFilter },
    ],
    queryFn: () =>
      fetchNotes({
        page: currentPage,
        search: debouncedSearch,
        tag: tagFilter,
        perPage: 12, 
      }),
  });

 
  const handlePageChange = (newPage: number) => {
    router.push(
      `/notes/filter/all/search/${debouncedSearch}/page/${newPage}`
    );
  };

  if (isLoading) return <div>Loading notes list...</div>;
  if (isError) return <div>Error loading notes.</div>;

  const notes = data?.notes || [];
  const totalPages = data?.totalPages || 1;

 
  return (
    <div className="container" style={{ padding: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
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
        <p>No notes found.</p>
      )}
    </div>
  );
}