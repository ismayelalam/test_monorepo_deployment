import type { NextConfig } from 'next';
const API_URL = process.env.Backend_URL;

if (!API_URL) {
  throw new Error('Backend_URL is not defined at build time');
}

const nextConfig: NextConfig = {
  output: 'standalone',
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${API_URL}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
