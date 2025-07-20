const nextConfig = {
  experimental: {
    serverActions: {} // already fine
  },
  allowedDevOrigins: [
    "http://localhost:3000",
    "https://3000-firebase-studio-*.cloudworkstations.dev"
  ]
}
module.exports = nextConfig