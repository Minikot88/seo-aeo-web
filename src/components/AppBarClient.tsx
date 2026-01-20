'use client'

import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'
import SearchBar from './SearchBar'
import ThemeToggle from './ThemeToggle'
import '@/styles/appbar.css'

export default function AppBarClient() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const hasSearch = !!searchParams.get('q')

  const [open, setOpen] = useState(false)
  const popupRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        popupRef.current &&
        !popupRef.current.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () =>
      document.removeEventListener(
        'mousedown',
        handleClickOutside
      )
  }, [])

  return (
    <header className="appbar">
      <div className="appbar-inner">
        <Link href="/" className="logo">
          AFF SHOP
        </Link>

        {hasSearch && (
          <button
            className="back-button"
            onClick={() => router.push('/')}
            aria-label="กลับหน้าแรก"
          >
            ←
          </button>
        )}

        <SearchBar />

        <div className="appbar-right" ref={popupRef}>
          <button
            className="contact-trigger"
            onClick={() => setOpen(v => !v)}
          >
            ติดต่อ ▾
          </button>

          {open && (
            <div className="contact-popup">
              <a href="mailto:contact@affshop.com">
                📧 Email
              </a>
              <a
                href="https://line.me/ti/p/@yourlineid"
                target="_blank"
                rel="noopener noreferrer"
              >
                💬 LINE
              </a>
              <a
                href="https://facebook.com/yourpage"
                target="_blank"
                rel="noopener noreferrer"
              >
                📘 Facebook
              </a>
            </div>
          )}

          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
