'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Product, FAQ } from '@/types/product'
import '@/styles/admin/admin-base.css'
import '@/styles/admin/admin-add.css'

export default function AddProductPage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)

  /* ===== PRODUCT ===== */
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [price, setPrice] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [category, setCategory] = useState('general')
  const [image, setImage] = useState('')
  const [affiliateUrl, setAffiliateUrl] = useState('')
  const [description, setDescription] = useState('')

  /* ===== SEO ===== */
  const [seoTitle, setSeoTitle] = useState('')
  const [seoDescription, setSeoDescription] = useState('')

  /* ===== FAQ (AEO) ===== */
  const [faqs, setFaqs] = useState<FAQ[]>([
    { question: '', answer: '' },
  ])

  function generateSlug(text: string) {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
  }

  async function save() {
    if (!name) return alert('กรุณาใส่ชื่อสินค้า')
    if (!price) return alert('กรุณาใส่ราคา')
    if (!affiliateUrl) return alert('กรุณาใส่ลิงก์ Affiliate')

    setSaving(true)

    const newProduct: Product = {
      id: Date.now().toString(),
      name,
      slug: slug || generateSlug(name),
      price,
      discount: discount || undefined,
      category,
      image,
      affiliateUrl,
      description,

      seoTitle: seoTitle || name,
      seoDescription: seoDescription || description,

      faqs: faqs.filter(f => f.question && f.answer),

      offer: {
        price: discount
          ? price - (price * discount) / 100
          : price,
        priceCurrency: 'THB',
        availability: 'InStock',
        url: affiliateUrl,
      },
    }

    await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct),
    })

    router.push('/admin')
  }

  return (
    <main className="admin admin-form">
      {/* ===== HEADER ===== */}
      <div className="form-header">
        <button
          className="btn ghost back-top"
          onClick={() => history.back()}
          disabled={saving}
        >
          ← ย้อนกลับ
        </button>
        <h1>➕ เพิ่มสินค้า</h1>
      </div>

      <div className="form-card">
        {/* ===== PRODUCT ===== */}
        <h2>ข้อมูลสินค้า</h2>

        <input placeholder="ชื่อสินค้า" value={name}
          onChange={e => {
            setName(e.target.value)
            setSlug(generateSlug(e.target.value))
          }} />

        <input placeholder="Slug" value={slug}
          onChange={e => setSlug(e.target.value)} />

        <input type="number" placeholder="ราคา"
          onChange={e => setPrice(+e.target.value)} />

        <input type="number" placeholder="ส่วนลด (%)"
          onChange={e => setDiscount(+e.target.value)} />

        <input placeholder="หมวดหมู่"
          onChange={e => setCategory(e.target.value)} />

        <input placeholder="ลิงก์รูปสินค้า"
          onChange={e => setImage(e.target.value)} />

        <input placeholder="Affiliate URL"
          onChange={e => setAffiliateUrl(e.target.value)} />

        <textarea placeholder="รายละเอียดสินค้า"
          onChange={e => setDescription(e.target.value)} />

        {/* ===== SEO ===== */}
        <h2>SEO</h2>
        <input placeholder="SEO Title"
          onChange={e => setSeoTitle(e.target.value)} />

        <textarea placeholder="SEO Description"
          onChange={e => setSeoDescription(e.target.value)} />

        {/* ===== FAQ ===== */}
        <h2>FAQ (AEO)</h2>

        {faqs.map((f, i) => (
          <div key={i}>
            <input placeholder="คำถาม"
              value={f.question}
              onChange={e => {
                const copy = [...faqs]
                copy[i].question = e.target.value
                setFaqs(copy)
              }} />
            <textarea placeholder="คำตอบ"
              value={f.answer}
              onChange={e => {
                const copy = [...faqs]
                copy[i].answer = e.target.value
                setFaqs(copy)
              }} />
          </div>
        ))}

        <button className="btn ghost"
          onClick={() =>
            setFaqs([...faqs, { question: '', answer: '' }])
          }>
          + เพิ่ม FAQ
        </button>

        {/* ===== SAVE ===== */}
        <div className="form-actions">
          <button
            className="btn primary"
            onClick={save}
            disabled={saving}
          >
            💾 บันทึกสินค้า
          </button>
        </div>
      </div>
    </main>
  )
}
