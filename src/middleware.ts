import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Simulasi mengecek cookie "user_role"
  // Dalam aplikasi nyata, ini akan mengecek JWT token atau session dari Supabase
  const role = request.cookies.get('user_role')?.value

  // Lindungi route yang diawali dengan /admin
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (role !== 'admin') {
      // Jika bukan admin, redirect ke homepage
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
