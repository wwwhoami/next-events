/** @type {import('next').NextConfig} */

const path = require('path')

const nextConfig = {
  images: {
    domains: [process.env.IMAGES_DOMAIN]
  },
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  }
}

module.exports = nextConfig
