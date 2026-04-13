import type { Metadata } from "next";
import { fetchNoteById } from "@/lib/api";

interface Props {
  params: { id: string }; 
}


export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const note = await fetchNoteById(params.id);

  return {
    title: note.title,
    description: note.content || "",
    openGraph: {
      title: note.title,
      description: note.content || "",
      url: `https://notehub.app/notes/${params.id}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        },
      ],
    },
  };
}


export default async function Page({ params }: Props) {
  const note = await fetchNoteById(params.id);

  return (
    <div>
      <h1>{note.title}</h1>
      <p>{note.content}</p>
    </div>
  );
}