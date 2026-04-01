/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // SR7 may have issues with strict mode double-mounting
  images: {
    unoptimized: true, // If using static export
  },
};

module.exports = nextConfig;