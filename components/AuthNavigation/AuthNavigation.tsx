"use client";

import Link from "next/link";
import { useAuthStore } from "@/lib/store/authStore";
import { logout } from "@/lib/api/api";
import { useRouter } from "next/navigation";

export default function AuthNavigation() {
  const { isAuthenticated, user, clearIsAuthenticated } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    clearIsAuthenticated();
    router.push("/sign-in");
  };

  if (!isAuthenticated) {
    return (
      <>
        <Link href="/sign-in" prefetch={false}>
          Login
        </Link>
        <Link href="/sign-up" prefetch={false}>
          Sign up
        </Link>
      </>
    );
  }

  return (
    <>
      <Link href="/profile" prefetch={false}>
        Profile
      </Link>

      <p>{user?.email}</p>

      <button onClick={handleLogout}>Logout</button>
    </>
  );
}