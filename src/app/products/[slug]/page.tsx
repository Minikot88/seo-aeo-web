import { getProductBySlug } from '@/lib/productService'
import { notFound } from 'next/navigation'
import '@/styles/product-detail.css'

type ProductPageProps = {
  params: Promise<{
    slug: string
  }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  const finalPrice = product.offer?.price ?? product.price

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
            image: product.image,
            description: product.description,
            offers: {
              '@type': 'Offer',
              price: product.offer?.price,
              priceCurrency: 'THB',
              availability: 'https://schema.org/InStock',
              url: product.offer?.url,
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
        {/* ===== HEADER ===== */}
        <div className="product-header">
          {/* IMAGE */}
          <div className="product-image">
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
            />
          </div>

          {/* INFO */}
          <div className="product-info">
            <h1>{product.name}</h1>

            <div className="product-category">
              หมวดหมู่: {product.category}
            </div>

            {/* PRICE */}
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

            {/* BUY BUTTON */}
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

        {/* ===== FAQ ===== */}
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
