import type { NextConfig } from 'next';
const API_URL = process.env.Backend_URL || 'http://localhost:8080 ';
console.log(API_URL);

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
