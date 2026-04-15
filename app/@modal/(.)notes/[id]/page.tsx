import { dehydrate, QueryClient, HydrationBoundary } from "@tanstack/react-query";
import NotePreview from "@/components/NotePreview/NotePreview";
import { fetchNoteById } from "@/lib/api/api";
import { Note } from "@/types/note";

type NoteModalPageProps = {
  params: {
    id: string;
  };
};

export default async function NoteModalPage({ params }: NoteModalPageProps) {
  const noteId = params.id;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
  });

  const note = queryClient.getQueryData<Note>(["note", noteId]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {note ? <NotePreview note={note} /> : <div>Заметка не найдена</div>}
    </HydrationBoundary>
  );
}