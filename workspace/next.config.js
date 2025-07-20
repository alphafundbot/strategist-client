/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  allowedDevOrigins: [
    'https://6000-firebase-studio-*.cloudworkstations.dev',
    'https://9000-firebase-studio-*.cloudworkstations.dev'
  ]
};

module.exports = nextConfig;
