import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactCompiler: true,

  images: {
    domains: ['picsum.photos'],
  },
}

export default nextConfig
