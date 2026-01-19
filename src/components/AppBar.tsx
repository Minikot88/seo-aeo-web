'use client'

import SearchBar from './SearchBar'
import ThemeToggle from './ThemeToggle'
import '@/styles/appbar.css'

export default function AppBar() {
  return (
    <header className="appbar">
      <div className="appbar-inner">
        <div className="logo">AFF SHOP</div>

        <SearchBar />

        <ThemeToggle />
      </div>
    </header>
  )
}
