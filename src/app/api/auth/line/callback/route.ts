import { NextResponse } from 'next/server'

const ADMIN_LINE_IDS = [
  'U1dd505e4cc713eed5d4f92400fe39a77', // LINE userId admin
]

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const code = searchParams.get('code')

  if (!code) {
    return NextResponse.redirect(
      new URL('/admin/login', req.url)
    )
  }

  // 1️⃣ ขอ token จาก LINE
  const tokenRes = await fetch(
    'https://api.line.me/oauth2/v2.1/token',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri:
          process.env.NEXT_PUBLIC_BASE_URL +
          '/api/auth/line/callback',
        client_id: process.env.LINE_CHANNEL_ID!,
        client_secret: process.env.LINE_CHANNEL_SECRET!,
      }),
    }
  )

  const token = await tokenRes.json()

  // ❌ LINE ไม่ส่ง id_token
  if (!token.id_token) {
    console.error('LINE TOKEN ERROR:', token)
    return NextResponse.redirect(
      new URL('/admin/login', req.url)
    )
  }

  // 2️⃣ decode id_token → LINE userId
  const payload = JSON.parse(
    Buffer.from(token.id_token.split('.')[1], 'base64').toString()
  )

  const lineUserId = payload.sub

  // 3️⃣ ตรวจว่าเป็น admin ไหม
  if (!ADMIN_LINE_IDS.includes(lineUserId)) {
    return NextResponse.redirect(
      new URL('/unauthorized', req.url)
    )
  }

  // 4️⃣ set cookie + redirect เข้า admin
  const res = NextResponse.redirect(
    new URL('/admin', req.url)
  )

  res.cookies.set('admin-auth', '1', {
    httpOnly: true,
    path: '/',
  })

  return res
}
