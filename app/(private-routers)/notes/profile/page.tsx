"use client";

import { useAuthStore } from "@/lib/store/authStore";
import Link from "next/link";

export default function ProfilePage() {
  const user = useAuthStore((s) => s.user);

  if (!user) return null;

  return (
    <main>
      <h1>Profile Page</h1>

      <p>Email: {user.email}</p>
      <p>Username: {user.username}</p>

      <Link href="/profile/edit">Edit</Link>
    </main>
  );
}