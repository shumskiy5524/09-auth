import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAuthPage =
    pathname.startsWith('/sign-in') ||
    pathname.startsWith('/sign-up');

  const isPrivatePage =
    pathname.startsWith('/profile') ||
    pathname.startsWith('/notes');

  const token = request.cookies.get('token'); 

  if (isPrivatePage && !token) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

 
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/profile', request.url));
  }

  return NextResponse.next();
}