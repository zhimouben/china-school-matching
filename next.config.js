/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
    domains: ['example.com'],
  },
  basePath: '/china-school-matching',
  assetPrefix: '/china-school-matching/',
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig 