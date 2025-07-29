// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true'
// });
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // <-- Add this line

  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
  env: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    NEXT_PUBLIC_STRIPE_PUBLIC_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY,
    NEXT_PUBLIC_STRIPE_SECRET_KEY: process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY,
    NEXT_PUBLIC_BASE_CURRENCY: process.env.NEXT_PUBLIC_BASE_CURRENCY,
    NEXT_PUBLIC_SHIPPING_FEE: process.env.NEXT_PUBLIC_SHIPPING_FEE,
    NEXT_PUBLIC_JWT_SECRET: process.env.NEXT_PUBLIC_JWT_SECRET,
    NEXT_PUBLIC_PAYPAL_CLIENT_ID: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXT_PUBLIC_NEXTAUTH_SECRET: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
    NEXT_PUBLIC_GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    NEXT_PUBLIC_GOOGLE_CLIENT_SEC: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SEC
  },
  images: {
    domains: ['ai-chat.vercel.app"', 'res.cloudinary.com']
  }
};

module.exports = nextConfig;
