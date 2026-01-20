'use client'

import { useState } from 'react'
import { getAllProducts } from '@/lib/productService'
import AdminClient from './AdminClient'

const ADMIN_KEY = process.env.NEXT_PUBLIC_ADMIN_KEY

export default function AdminPage() {
  // ✅ อ่าน localStorage ตอน init (ไม่ใช้ useEffect)
  const [authorized, setAuthorized] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    return localStorage.getItem('admin-auth') === '1'
  })

  const [key, setKey] = useState('')

  function handleLogin() {
    if (key === ADMIN_KEY) {
      localStorage.setItem('admin-auth', '1')
      setAuthorized(true)
    } else {
      alert('❌ รหัสไม่ถูกต้อง')
    }
  }

  // ===== ยังไม่ผ่าน =====
  if (!authorized) {
    return (
      <main
        style={{
          maxWidth: 400,
          margin: '100px auto',
          padding: 20,
          background: '#fff',
          borderRadius: 12,
          boxShadow: '0 10px 30px rgba(0,0,0,.15)',
        }}
      >
        <h2>🔐 เข้าสู่ระบบผู้ดูแล</h2>

        <input
          type="password"
          placeholder="ใส่รหัส 32 ตัว"
          value={key}
          onChange={e => setKey(e.target.value)}
          style={{
            width: '100%',
            padding: '10px 12px',
            marginTop: 12,
            borderRadius: 8,
            border: '1px solid #ddd',
          }}
        />

        <button
          style={{
            marginTop: 12,
            width: '100%',
            padding: '10px',
            borderRadius: 8,
            border: 'none',
            background: '#ee4d2d',
            color: '#fff',
            fontWeight: 600,
            cursor: 'pointer',
          }}
          onClick={handleLogin}
        >
          เข้าสู่ระบบ
        </button>
      </main>
    )
  }

  // ===== ผ่านแล้ว =====
  const products = getAllProducts()
  return <AdminClient products={products} />
}
