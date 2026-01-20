import { Suspense } from 'react'
import AddClient from './AddClient'

export default function Page() {
  return (
    <Suspense fallback={<div>กำลังโหลด...</div>}>
      <AddClient />
    </Suspense>
  )
}