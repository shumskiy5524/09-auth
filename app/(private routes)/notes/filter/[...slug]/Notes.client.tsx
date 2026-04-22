"use client";

import { useState } from "react";
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
  const currentPage = pageIndex !== -1 ? parseInt(slug[pageIndex + 1]) : 1;
  
  const initialSearch = slug.includes("search") ? slug[slug.indexOf("search") + 1] : "";
  const [search, setSearch] = useState(initialSearch);

  
  const tagFilter = slug.includes("tag") ? slug[slug.indexOf("tag") + 1] : "";

  
  const handlePageChange = (newPage: number) => {
    router.push(`/notes/filter/all/page/${newPage}`);
  };

 
  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", { page: currentPage, search, tag: tagFilter }],
    queryFn: () => fetchNotes({ page: currentPage, search, tag: tagFilter }),
  });

  if (isLoading) return <div>Loading notes list...</div>;
  if (isError) return <div>Error loading notes.</div>;

  return (
    <div className="container" style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>My Notes</h1>
        
       
        <Link 
          href="/notes/action/create" 
          style={{ 
            padding: '10px 20px', 
            background: '#0070f3', 
            color: 'white', 
            borderRadius: '6px', 
            textDecoration: 'none',
            fontWeight: 'bold' 
          }}
        >
          + Create New Note
        </Link>
      </div>

      
      <SearchBox value={search} onChange={setSearch} />

    
      <NoteList notes={data || []} />

      
      <Pagination 
        currentPage={currentPage} 
        totalPages={1} 
        onPageChange={handlePageChange} 
      />
    </div>
  );
}