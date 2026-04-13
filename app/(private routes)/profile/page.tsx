"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import css from "./Profile.module.css";

import { getMe } from "@/lib/api/clientApi";

export const metadata = {
  title: "Profile | NoteHub",
  description: "User profile page",
};

export default function ProfilePage() {
  const [user, setUser] = useState<null | {
    username: string;
    email: string;
    avatar: string;
  }>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getMe();
        setUser(data);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <p>Loading...</p>;

  if (!user) return <p>No user data</p>;

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>

          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>

        <div className={css.avatarWrapper}>
          <Image
            src={user.avatar}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>

        <div className={css.profileInfo}>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
}