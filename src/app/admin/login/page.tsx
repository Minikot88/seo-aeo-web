import '@/styles/admin/admin-login.css'

export default function AdminLoginPage() {
    const redirectUri =
        process.env.NEXT_PUBLIC_BASE_URL +
        '/api/auth/line/callback'

    const lineLoginUrl =
        'https://access.line.me/oauth2/v2.1/authorize' +
        '?response_type=code' +
        `&client_id=${process.env.LINE_CHANNEL_ID}` +
        `&redirect_uri=${encodeURIComponent(redirectUri)}` +
        '&state=admin_login' +
        '&scope=profile%20openid'

    return (
       <main className="admin-login">
  <div className="login-card">
    <h2>🔐 เข้าสู่ระบบผู้ดูแล</h2>
    <p className="subtitle">สำหรับผู้ดูแลระบบเท่านั้น</p>

    <a href={lineLoginUrl} className="btn-line">
      <span className="line-icon">LINE</span>
      Login with LINE
    </a>
  </div>
</main>


    )
}
