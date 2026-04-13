"use client";

import Link from "next/link";
import { useAuthStore } from "@/lib/store/authStore";
import { logout } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";

export default function AuthNavigation() {
  const { isAuthenticated, clearAuth } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    clearAuth();
    router.push("/sign-in");
  };

  if (!isAuthenticated) {
    return (
      <>
        <Link href="/sign-in">Login</Link>
        <Link href="/sign-up">Sign up</Link>
      </>
    );
  }

  return (
    <>
      <Link href="/profile">Profile</Link>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}