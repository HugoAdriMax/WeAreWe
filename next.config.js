const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.midjourney.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.tiny.cloud',
        pathname: '**',
      },
    ],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@lib': path.resolve(__dirname, 'app/lib'),
      '@models': path.resolve(__dirname, 'app/models'),
    };
    return config;
  },
};

module.exports = nextConfig;
