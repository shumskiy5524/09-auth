import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { checkSession } from "./lib/api/serverApi";

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAuthPage =
    pathname.startsWith("/sign-in") ||
    pathname.startsWith("/sign-up");

  const isPrivatePage =
    pathname.startsWith("/profile") ||
    pathname.startsWith("/notes");

  const accessToken = request.cookies.get("accessToken");
  const refreshToken = request.cookies.get("refreshToken");

  let isAuthenticated = !!accessToken;


  if (!accessToken && refreshToken) {
    try {
      const session = await checkSession();

      if (session) {
        isAuthenticated = true;
      }
    } catch {
  isAuthenticated = false;
}
  }

  if (isPrivatePage && !isAuthenticated) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  
  if (isAuthPage && isAuthenticated) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}