import AppBar from '@/components/AppBar'
import { siteSEO } from '@/seo/site'
import Script from 'next/script'
import './globals.css'

export const metadata = siteSEO

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="th">
      <body>
        {/* WebSite Schema (SEO + AEO) */}
        <Script
          id="website-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "AFF SHOP",
              url: "https://yourdomain.com",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://yourdomain.com/?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            }),
          }}
        />

        <AppBar />
        {children}
      </body>
    </html>
  )
}
