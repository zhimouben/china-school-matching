/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/china-school-matching',
  assetPrefix: '/china-school-matching/',
}

module.exports = nextConfig 