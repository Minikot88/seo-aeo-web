import Image from 'next/image'
import { getProductBySlug } from '@/lib/productService'
import { notFound } from 'next/navigation'
import '@/styles/product-detail.css'

type ProductPageProps = {
  params: {
    slug: string
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = params
  const product = getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  const finalPrice = product.offer?.price ?? product.price

  // ✅ ตรวจสอบว่ารูปใช้ได้จริง
  const hasImage =
    typeof product.image === 'string' &&
    (product.image.startsWith('http') || product.image.startsWith('/'))

  return (
    <>
      {/* ===== Product + Offer Schema ===== */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: product.name,
            // ✅ ใส่ image เฉพาะตอนมีรูป
            ...(hasImage && { image: [product.image] }),
            description: product.description,
            offers: {
              '@type': 'Offer',
              price: finalPrice,
              priceCurrency: 'THB',
              availability: 'https://schema.org/InStock',
              url: product.affiliateUrl,
            },
          }),
        }}
      />

      {/* ===== FAQ Schema ===== */}
      {product.faqs && product.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: product.faqs.map(faq => ({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: faq.answer,
                },
              })),
            }),
          }}
        />
      )}

      {/* ===== PAGE UI ===== */}
      <main className="product-page">
        <div className="product-header">
          {/* ===== IMAGE (LCP) ===== */}
          {hasImage && (
            <div className="product-image">
              <Image
                src={product.image}
                alt={product.name}
                width={500}
                height={500}
                priority
                sizes="(max-width: 768px) 100vw, 420px"
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
          )}

          {/* ===== INFO ===== */}
          <div className="product-info">
            <h1>{product.name}</h1>

            <div className="product-category">
              หมวดหมู่: {product.category}
            </div>

            <div className="product-price">
              <span className="current">
                ฿{finalPrice.toLocaleString()}
              </span>

              {product.discount && (
                <>
                  <span className="original">
                    ฿{product.price.toLocaleString()}
                  </span>
                  <span className="discount">
                    -{product.discount}%
                  </span>
                </>
              )}
            </div>

            <a
              href={product.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="buy-btn"
            >
              🛒 ซื้อสินค้านี้
            </a>
          </div>
        </div>

        {/* ===== DESCRIPTION ===== */}
        <section className="product-section">
          <h2>รายละเอียดสินค้า</h2>
          <div className="product-description">
            {product.description}
          </div>
        </section>

        {/* ===== FAQ UI ===== */}
        {product.faqs && product.faqs.length > 0 && (
          <section className="product-section">
            <h2>คำถามที่พบบ่อย</h2>

            {product.faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </div>
            ))}
          </section>
        )}
      </main>
    </>
  )
}
