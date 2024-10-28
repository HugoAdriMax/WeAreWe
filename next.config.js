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
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048], // Ajout des tailles d'appareil
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384], // Ajout des tailles d'image
    formats: ['image/webp'], // Support du format WebP
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