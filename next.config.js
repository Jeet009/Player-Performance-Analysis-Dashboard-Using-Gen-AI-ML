/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['pandas', 'scikit-learn']
  }
}

module.exports = nextConfig 