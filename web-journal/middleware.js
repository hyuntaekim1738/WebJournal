import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(request) {
  const token = await getToken({ req: request });
  const { pathname } = request.nextUrl;

  const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/signup');
  const isHomePage = pathname === '/';

  // redirect unauthenticated users to /login if they're not on /login, /signup, or /
  if (!token && !isAuthPage && !isHomePage) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // redirect authenticated users away from /login, /signup, or / to /home
  if (token && (isAuthPage || isHomePage)) {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
