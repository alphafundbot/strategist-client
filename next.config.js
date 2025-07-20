/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  experimental: {
    allowedNextDevOrigins: [
      "https://6000-firebase-studio-*.cloudworkstations.dev",
      "https://9003-firebase-studio-*.cloudworkstations.dev"
    ]
  }
};

module.exports = nextConfig;
