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
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp'],
  },
  webpack: (config, { isServer }) => {
    // Ajout d'alias personnalisés
    config.resolve.alias = {
      ...config.resolve.alias,
      '@lib': path.resolve(__dirname, 'app/lib'),
      '@models': path.resolve(__dirname, 'app/models'),
      'tinymce': path.resolve(__dirname, 'node_modules/tinymce'),
    };

    // Support spécifique pour TinyMCE
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
      };
    }

    // Exclure `mongodb` du bundle côté serveur
    if (isServer) {
      config.externals.push('mongodb');
    }

    return config;
  },
  transpilePackages: ['tinymce'],
};

module.exports = nextConfig;
