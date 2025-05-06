/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['mongodb', 'mongoose', 'bcryptjs'],
  },
  // Set specific route segments to use Node.js runtime
  serverRuntimeConfig: {
    // Add Node.js runtime for auth routes
    authRoutes: {
      runtime: 'nodejs'
    }
  }
}

module.exports = nextConfig