import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const res = NextResponse.redirect(
    new URL('/admin/login', req.url)
  )

  // ✅ ถูกต้อง ไม่มี TypeScript error
  res.cookies.delete('admin-auth')

  return res
}
