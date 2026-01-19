'use client'

import { useEffect, useState } from 'react'
import '@/styles/theme-toggle.css'

export default function ThemeToggle() {
  // ✅ อ่าน localStorage ตอน init state (ไม่ใช้ effect)
  const [dark, setDark] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    return localStorage.getItem('theme') === 'dark'
  })

  // sync state → DOM + localStorage
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

  return (
    <button
      className={`theme-switch ${dark ? 'dark' : ''}`}
      onClick={() => setDark(v => !v)}
      aria-label="Toggle theme"
      title="Dark / Light mode"
    >
      <span className="icon sun">☀️</span>
      <span className="icon moon">🌙</span>
      <span className="thumb" />
    </button>
  )
}
