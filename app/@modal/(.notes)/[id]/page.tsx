import { dehydrate, QueryClient, HydrationBoundary } from '@tanstack/react-query';
import NotePreview from '@/components/NotePreview/NotePreview';
import { fetchNoteById } from '@/lib/api';
import { Note } from '@/types/note';

type NoteModalPageProps = {
  params: Promise<{ id: string }>;
};

export default async function NoteModalPage({ params }: NoteModalPageProps) {
  const { id: noteId } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
  });

  const note = queryClient.getQueryData<Note>(['note', noteId]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {note ? <NotePreview note={note} /> : <div>Заметка не найдена</div>}
    </HydrationBoundary>
  );
}