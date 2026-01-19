import type { Metadata } from 'next'

export const siteSEO: Metadata = {
  title: {
    default: 'AFF SHOP',
    template: '%s | AFF SHOP',
  },
  description: 'เว็บแนะนำสินค้า Affiliate จาก Shopee',
  metadataBase: new URL('https://yourdomain.com'),
  openGraph: {
    type: 'website',
    siteName: 'AFF SHOP',
  },
}
