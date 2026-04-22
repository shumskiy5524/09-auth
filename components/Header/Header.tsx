"use client";

import css from './Header.module.css';
import Link from 'next/link';
import { useAuthStore } from "@/lib/store/authStore";

const Header = () => {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.clearIsAuthenticated); 

  return (
    <header className={css.header}>
      <Link href="/" className={css.logo} aria-label="Home">
        NoteHub
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/notes/filter/all">Notes</Link></li>
          
          {!user ? (
            <>
              <li><Link href="/sign-in" className={css.authLink}>Login</Link></li>
              <li><Link href="/sign-up" className={css.authLink}>Register</Link></li>
            </>
          ) : (
            <>
              <li className={css.userName}>{user.email}</li>
              <li>
                <button onClick={logout} className={css.logoutBtn}>
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;