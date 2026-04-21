
'use client';

import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api/clientApi';
import type { Note } from '@/types/note';
import Modal from '@/components/Modal/Modal'; 

type Props = {
  id: string;
};

export default function NotePreview({ id }: Props) {
  const router = useRouter();

  const { data, isLoading, isError } = useQuery<Note>({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

 
  const handleClose = () => {
    router.back();
  };

  if (isLoading) return null; 
  if (isError || !data) return null;

  return (
    <Modal onClose={handleClose}>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{data.title}</h2>
          <button 
            onClick={handleClose}
            className="text-gray-500 hover:text-black p-2"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>
        
        <div className="prose prose-sm max-w-none">
          <p>{data.content}</p>
        </div>

        <div className="mt-6 flex justify-end">
          <button 
            onClick={handleClose}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
          >
            Закрити
          </button>
        </div>
      </div>
    </Modal>
  );
}