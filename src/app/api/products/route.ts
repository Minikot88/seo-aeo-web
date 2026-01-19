// src/app/api/products/route.ts
// (ไม่มี DELETE)

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

export async function GET() {
  return NextResponse.json(readData())
}

export async function POST(req: Request) {
  const data = readData()
  const body: Product = await req.json()
  data.push(body)
  writeData(data)
  return NextResponse.json({ success: true })
}

export async function PUT(req: Request) {
  const data = readData()
  const body: Product = await req.json()

  const index = data.findIndex(p => p.id === body.id)
  if (index !== -1) {
    data[index] = body
    writeData(data)
  }

  return NextResponse.json({ success: true })
}
