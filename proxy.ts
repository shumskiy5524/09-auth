import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { checkSession } from './lib/api/serverApi';

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAuthPage =
    pathname.startsWith('/sign-in') ||
    pathname.startsWith('/sign-up');

  const isPrivatePage =
    pathname.startsWith('/profile') ||
    pathname.startsWith('/notes');

  const cookieStore = await cookies();

  const accessToken = cookieStore.get('accessToken');
  const refreshToken = cookieStore.get('refreshToken');

  let isAuthenticated = !!accessToken;

  const response = NextResponse.next();

  if (!accessToken && refreshToken) {
    try {
      const sessionResponse = await checkSession();

      if (sessionResponse.data) {
        isAuthenticated = true;

      
        const setCookie = sessionResponse.headers['set-cookie'];

if (setCookie) {
  if (Array.isArray(setCookie)) {
    setCookie.forEach((cookie) => {
      response.headers.append('set-cookie', cookie);
    });
  } else {
    response.headers.set('set-cookie', setCookie);
  }
}
      }
    } catch {
      isAuthenticated = false;
    }
  }

  if (isPrivatePage && !isAuthenticated) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  if (isAuthPage && isAuthenticated) {
    return NextResponse.redirect(new URL('/profile', request.url));
  }

  return response;
}