// src/app/api/products/[id]/route.ts
// ✅ FIX: ต้อง await params ก่อนใช้ (Next.js 16 / Turbopack)

import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { Product } from '@/types/product'

const filePath = path.join(process.cwd(), 'src/data/products.json')

function readData(): Product[] {
  return JSON.parse(fs.readFileSync(filePath, 'utf8')) as Product[]
}

function writeData(data: Product[]) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
}

export async function DELETE(
  req: Request,
  ctx: { params: Promise<{ id: string }> } // ✅ params เป็น Promise
) {
  const { id } = await ctx.params // ✅ ต้อง await ตรงนี้

  const data = readData()
  const newData = data.filter(p => p.id !== id)
  writeData(newData)

  return NextResponse.json({ success: true })
}
