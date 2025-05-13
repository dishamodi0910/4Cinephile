/** @type {import('next').NextConfig} */
const nextConfig = {
    images : {
        domains: ['res.cloudinary.com'],
        remotePatterns : [
            {
                protocol : 'https',
                hostname : '*.googleusercontent.com'
            }
        ]
    },
    experimental: {
        serverActions: {
          allowedOrigins: [
            'http://localhost:3000',
            'https://ideal-space-lamp-5jqq7r94jwq2v9p-3000.app.github.dev/',
          ]
        }
      }
}

module.exports = nextConfig
