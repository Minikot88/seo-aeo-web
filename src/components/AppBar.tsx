import { Suspense } from 'react'
import AppBarClient from './AppBarClient'

export default function AppBar() {
  return (
    <Suspense fallback={null}>
      <AppBarClient />
    </Suspense>
  )
}
