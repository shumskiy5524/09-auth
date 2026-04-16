import { dehydrate, QueryClient, HydrationBoundary } from "@tanstack/react-query";
import NotePreview from "@/components/NotePreview/NotePreview";
import { fetchNoteById } from "@/lib/api/serverApi"; 

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

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreview noteId={noteId} /> 
    </HydrationBoundary>
  );
}