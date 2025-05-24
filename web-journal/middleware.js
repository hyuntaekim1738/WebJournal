import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(request) {
  const token = await getToken({ req: request });
  const isAuthPage = request.nextUrl.pathname.startsWith('/login') || 
                    request.nextUrl.pathname.startsWith('/signup');
  const isHomePage = request.nextUrl.pathname === '/';

  if (!token && !isAuthPage && !isHomePage) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/home', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * mtach all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};