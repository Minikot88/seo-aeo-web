import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (
    pathname.startsWith('/admin/login') ||
    pathname.startsWith('/api/auth/line')
  ) {
    return NextResponse.next()
  }

  const auth = req.cookies.get('admin-auth')

  if (!auth) {
    return NextResponse.redirect(
      new URL('/admin/login', req.url)
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
