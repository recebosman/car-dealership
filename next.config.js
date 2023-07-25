/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      "localhost",
      "firebasestorage.googleapis.com",
      "images.unsplash.com",
    ],
  },
};

module.exports = nextConfig;
