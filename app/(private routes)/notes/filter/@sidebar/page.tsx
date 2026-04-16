import Link from "next/link";

export default function Sidebar() {
  return (
    <aside style={{ padding: "16px", borderRight: "1px solid #ddd" }}>
      <h3>Filters</h3>

      <ul style={{ listStyle: "none", padding: 0 }}>
        <li>
          <Link href="/notes/filter/all">All</Link>
        </li>
        <li>
          <Link href="/notes/filter/work">Work</Link>
        </li>
        <li>
          <Link href="/notes/filter/personal">Personal</Link>
        </li>
      </ul>
    </aside>
  );
}