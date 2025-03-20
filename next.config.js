/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/china-school-matching',
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig 