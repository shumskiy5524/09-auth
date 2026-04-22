import NoteDetails from "./NoteDetails.client";

interface PageProps {
  params: {
    id: string;
  };
}

export default function NotePage({ params }: PageProps) {
  return <NoteDetails id={params.id} />;
}