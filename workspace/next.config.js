/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  allowedDevOrigins: [
    'https://*.cloudworkstations.dev'
  ]
};

module.exports = nextConfig;
