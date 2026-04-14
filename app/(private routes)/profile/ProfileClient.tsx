"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getMe } from "../../../lib/api/clientApi";

export default function ProfileClient() {
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
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>No user data</p>;

  return (
    <main className="mainContent">
      <div className="profileCard">
        <div className="header">
          <h1 className="formTitle">Profile Page</h1>
          <Link href="/profile/edit" className="editProfileButton">
            Edit Profile
          </Link>
        </div>

        <div className="avatarWrapper">
          <Image
            src={user.avatar || "/default-avatar.png"}
            alt="User Avatar"
            width={120}
            height={120}
            className="avatar"
          />
        </div>

        <div className="profileInfo">
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
}