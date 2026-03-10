/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Removed output: "export" because API routes need server runtime
  images: {
    unoptimized: true, // keep this for remote images
  },
  experimental: {
    // serverActions: true, // optional if you use server actions
  },
};

export default nextConfig;