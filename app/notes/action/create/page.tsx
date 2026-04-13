export default function Page() {
  return (
    <main>
      <h1>Create note</h1>

      <form>
        <input placeholder="Title" />
        <textarea placeholder="Text" />
        <button type="submit">Save</button>
      </form>
    </main>
  );
}