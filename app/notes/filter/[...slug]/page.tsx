import type { Metadata } from "next";

interface Props {
  params: { slug: string[] };
}


interface Note {
  id: string;
  title: string;
  content?: string;
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

  
  const mockNotes: Note[] = [
    { id: "1", title: "Learn React", content: "Study hooks and components" },
    { id: "2", title: "Next.js Tips", content: "Server vs Client components" },
    { id: "3", title: "TypeScript", content: "Strong typing for safety" },
  ];

 
  const notes = tag === "all" ? mockNotes : mockNotes.filter(n => n.title.toLowerCase().includes(tag.toLowerCase()));

  return (
    <div>
      <h1>Notes filtered by: {tag}</h1>
      {notes.length === 0 ? (
        <p>No notes found for this tag.</p>
      ) : (
        <ul>
          {notes.map(note => (
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