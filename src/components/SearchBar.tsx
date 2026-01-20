'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import '@/styles/search.css'

export default function SearchBar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [q, setQ] = useState(searchParams.get('q') || '')

  const onSearch = () => {
    if (!q.trim()) return
    router.push(`/?q=${encodeURIComponent(q.trim())}`)
  }

  return (
    <form
      className="search-form"
      onSubmit={e => {
        e.preventDefault()
        onSearch()
      }}
    >
      <input
        className="search-input"
        value={q}
        onChange={e => setQ(e.target.value)}
        placeholder="ค้นหาสินค้า"
      />

      <button
        type="submit"
        className="search-button"
        disabled={!q.trim()}
      >
        ค้นหา
      </button>
    </form>
  )
}
