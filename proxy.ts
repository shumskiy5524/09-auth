import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { checkSession } from './lib/api/serverApi';

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

 
  const isAuthPage = pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up');
  const isPrivatePage = pathname.startsWith('/profile') || pathname.startsWith('/notes');

  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  let isAuthenticated = !!accessToken;
  let newCookies: string[] = [];

  
  if (!accessToken && refreshToken) {
    try {
     
      const sessionResponse = await checkSession();

      if (sessionResponse) {
        isAuthenticated = true;
        
      
        const setCookieHeader = sessionResponse.headers?.['set-cookie'];
        if (setCookieHeader) {
          newCookies = Array.isArray(setCookieHeader) ? setCookieHeader : [setCookieHeader];
        }
      }
    } catch {
      isAuthenticated = false;
    }
  }

  let response: NextResponse;

  
  if (isPrivatePage && !isAuthenticated) {
    response = NextResponse.redirect(new URL('/sign-in', request.url));
  } 
  
  else if (isAuthPage && isAuthenticated) {
    response = NextResponse.redirect(new URL('/profile', request.url));
  } 
  
  else {
    response = NextResponse.next();
  }


  newCookies.forEach((cookie) => {
    response.headers.append('set-cookie', cookie);
  });

  return response;
}