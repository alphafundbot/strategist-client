
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify:      true,

  // 1. Enable App Router (folder-based routing)
  experimental: {
    appDir: true,
  },

  // 2. (Optional) Redirect legacy /page → /trading if you ever need a fallback
  async redirects() {
    return [
      {
        source:      '/page',
        destination: '/trading',
        permanent:    true,
      },
    ];
  },

  // 3. Keep your existing build overrides
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  // 4. Remote image domains you already have
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
