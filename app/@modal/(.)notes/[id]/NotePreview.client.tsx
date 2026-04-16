'use client';

import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import Modal from '@/components/Modal/Modal';
import { fetchNoteById } from '@/lib/api/clientApi'; 
import { Note } from '@/types/note';

interface NotePreviewProps {
  noteId: string;
}

export default function NotePreview({ noteId }: NotePreviewProps) {
  const router = useRouter();

  const { data: note, isLoading, isError } = useQuery<Note>({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
    refetchOnMount: false,
  });

  if (isLoading) {
    return (
      <Modal onClose={() => router.back()}>
        <p>Loading...</p>
      </Modal>
    );
  }

  if (isError || !note) {
    return (
      <Modal onClose={() => router.back()}>
        <p>Error loading note</p>
      </Modal>
    );
  }

  return (
    <Modal onClose={() => router.back()}>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
      <p><strong>Tag:</strong> {note.tag}</p>
      <p><strong>Created At:</strong> {new Date(note.createdAt).toLocaleString()}</p>

      <button onClick={() => router.back()}>Close</button>
    </Modal>
  );
}