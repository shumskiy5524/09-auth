import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api/serverApi";
import NoteDetails from "./NoteDetails.client";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function NotePage({ params }: PageProps) {
  const queryClient = new QueryClient();
  const { id } = params;

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetails id={id} />
    </HydrationBoundary>
  );
}