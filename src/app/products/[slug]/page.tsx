import Image from 'next/image'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getProductBySlug } from '@/lib/productService'
import '@/styles/product-detail.css'

type PageProps = {
  params: Promise<{
    slug: string
  }>
}

/* ===================== SEO META ===================== */
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)

  if (!product) return {}

  const images = Array.isArray(product.image)
    ? product.image
    : [product.image]

  return {
    title: product.seoTitle ?? product.name,
    description:
      product.seoDescription ??
      product.description.slice(0, 160),
    openGraph: {
      title: product.name,
      description: product.seoDescription,
      images,
      type: 'website', // ✅ FIX
    },
  }
}


/* ===================== PAGE ===================== */
export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params
  const product = getProductBySlug(slug)

  if (!product) notFound()

  const finalPrice = product.offer?.price ?? product.price
  const images = Array.isArray(product.image)
    ? product.image
    : [product.image]

  return (
    <>
      {/* ===== Product Schema ===== */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: product.name,
            image: images,
            description: product.description,
            brand: product.brand,
            sku: product.sku,
            offers: {
              '@type': 'Offer',
              price: finalPrice,
              priceCurrency: 'THB',
              availability:
                product.offer?.availability ??
                'https://schema.org/InStock',
              url: product.affiliateUrl,
            },
            ...(product.ratingValue && product.reviewCount
              ? {
                  aggregateRating: {
                    '@type': 'AggregateRating',
                    ratingValue: product.ratingValue,
                    reviewCount: product.reviewCount,
                  },
                }
              : {}),
          }),
        }}
      />

      {/* ===== FAQ Schema ===== */}
      {product.faqs?.length && (
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

      {/* ================= UI ================= */}
      <main className="product-page">
        <div className="product-header">
          {/* IMAGE */}
          {images[0] && (
            <div className="product-image">
              <Image
                src={images[0]}
                alt={product.name}
                width={500}
                height={500}
                priority
                sizes="(max-width: 768px) 100vw, 420px"
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
          )}

          {/* INFO */}
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

        {/* DESCRIPTION */}
        <section className="product-section">
          <h2>รายละเอียดสินค้า</h2>
          <p>{product.description}</p>
        </section>

        {/* FAQ UI */}
        {product.faqs?.length && (
          <section className="product-section">
            <h2>คำถามที่พบบ่อย</h2>
            {product.faqs.map((faq, i) => (
              <div key={i} className="faq-item">
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
