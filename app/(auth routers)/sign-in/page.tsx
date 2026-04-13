"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/lib/api/clientApi";
import css from "../auth.module.css";

export default function SignUpPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    try {
      await register({ email, password });
      router.push("/profile");
    } catch {
      setError("Registration error");
    }
  };

  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>

      <form className={css.form} onSubmit={handleSubmit}>
        <input name="email" placeholder="Email" />
        <input name="password" type="password" placeholder="Password" />

        <button type="submit">Register</button>

        {error && <p>{error}</p>}
      </form>
    </main>
  );
}