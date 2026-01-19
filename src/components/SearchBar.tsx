'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import '@/styles/search.css'

export default function SearchBar() {
  const [q, setQ] = useState('')
  const router = useRouter()

  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        router.push(`/?q=${q}`)
      }}
      className="search-form"
    >
      <input
        className="search-input"
        value={q}
        onChange={e => setQ(e.target.value)}
        placeholder="ค้นหาสินค้า"
      />
    </form>
  )
}
