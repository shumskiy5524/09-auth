'use client';

import Link from "next/link";
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api/clientApi';
import { Note } from '@/types/note';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import NoteList from '@/components/NoteList/NoteList';

interface Props {
  tag?: string;
}

export default function NotesClient({ tag }: Props) {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(t);
  }, [search]);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const { data, isLoading, isError } = useQuery<Note[]>({
    queryKey: ['notes', tag, debouncedSearch, page],
    queryFn: () =>
      fetchNotes({
        tag: tag === 'all' ? undefined : tag,
        search: debouncedSearch,
        page,
      }),
  });

  const notes = data ?? [];
  const totalPages = 1; // ⚠️ временно, потому что API не отдаёт totalPages

  return (
    <div>
      <SearchBox value={search} onChange={handleSearchChange} />

      <Link href="/notes/create">
        <button>Create note +</button>
      </Link>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading notes</p>}

      {!isLoading && notes.length > 0 && <NoteList notes={notes} />}
      {!isLoading && notes.length === 0 && <p>No notes found</p>}

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}