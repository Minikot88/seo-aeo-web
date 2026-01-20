import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactCompiler: true,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'down-th.img.susercontent.com',
        pathname: '/file/**',
      },
      {
        protocol: 'https',
        hostname: 'cf.shopee.co.th',
        pathname: '/file/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig