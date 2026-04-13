import Link from 'next/link';

const tags = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

export default function DefaultSidebar() {
  return (
    <nav>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        <li style={{ marginBottom: '8px' }}>
          <Link href="/notes/filter/all">
            All notes
          </Link>
        </li>

        {tags.map((tag) => (
          <li key={tag} style={{ marginBottom: '8px' }}>
            <Link href={`/notes/filter/${tag}`}>
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}