"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { updateMe } from "@/lib/api/clientApi";

export default function EditProfile() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    const username = (
      form.elements.namedItem("username") as HTMLInputElement
    ).value;

    await updateMe({ username });

    router.push("/profile");
  };

  if (!user) return null;

  return (
    <main>
      <h1>Edit Profile</h1>

      <form onSubmit={handleSubmit}>
        <input name="username" defaultValue={user.username} />

        <button type="submit">Save</button>
        <button type="button" onClick={() => router.push("/profile")}>
          Cancel
        </button>
      </form>
    </main>
  );
}