/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['187.124.88.125'],
  env: {
    'ANTHROPIC_API_KEY': process.env.ANTHROPIC_API_KEY,
  },
};

export default nextConfig;