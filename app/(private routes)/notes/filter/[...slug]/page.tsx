import type { Metadata } from "next";
import { fetchNotes } from "@/lib/api/serverApi";
import type { Note } from "@/types/note";
interface Props {
  params: { slug: string[] };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tag = params.slug?.[0] || "all";

  return {
    title: `Notes by filter: ${tag}`,
    description: `Viewing notes filtered by ${tag}`,
    openGraph: {
      title: `Notes by filter: ${tag}`,
      description: `Viewing notes filtered by ${tag}`,
      url: `https://notehub.app/notes/filter/${tag}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        },
      ],
    },
  };
}

export default async function Page({ params }: Props) {
  const tag = params.slug?.[0] || "all";

  const res = await fetchNotes({
    tag: tag === "all" ? "" : tag,
  });

 const notes = res;
  return (
    <div>
      <h1>Notes filtered by: {tag}</h1>

      {notes.length === 0 ? (
        <p>No notes found for this tag.</p>
      ) : (
        <ul>
          {notes.map((note: Note) => (
            <li key={note.id}>
              <strong>{note.title}</strong>
              {note.content && <p>{note.content}</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}