import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import { Providers } from "./providers";
import { siteMetadata } from './config/metadata';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.title}`,
  },
  description: siteMetadata.description,
  keywords: siteMetadata.keywords,
  authors: [{ name: siteMetadata.author }],
  creator: siteMetadata.author,
  manifest: '/manifest.json',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: siteMetadata.siteUrl,
    siteName: siteMetadata.title,
    locale: 'fr_FR',
    images: [
      {
        url: 'https://i.imgur.com/2IAHziM.png',
        width: 1200,
        height: 630,
        alt: siteMetadata.title,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteMetadata.title,
    description: siteMetadata.description,
    creator: siteMetadata.twitterHandle,
    images: ['https://i.imgur.com/2IAHziM.png'],
  },
  icons: {
    icon: [
      { url: 'https://i.imgur.com/2IAHziM.png', type: 'image/png' },
    ],
    shortcut: [{ url: 'https://i.imgur.com/2IAHziM.png', type: 'image/png' }],
    apple: [
      { url: 'https://i.imgur.com/2IAHziM.png', type: 'image/png' },
    ],
    other: [
      {
        rel: 'apple-touch-icon-precomposed',
        url: 'https://i.imgur.com/2IAHziM.png',
      },
    ],
  },
  alternates: {
    canonical: siteMetadata.siteUrl,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={siteMetadata.siteUrl} />
        {/* Favicon setup */}
        <link rel="icon" type="image/png" href="https://i.imgur.com/2IAHziM.png" />
        <link rel="shortcut icon" type="image/png" href="https://i.imgur.com/2IAHziM.png" />
        <link rel="apple-touch-icon" href="https://i.imgur.com/2IAHziM.png" />
        <link rel="apple-touch-icon-precomposed" href="https://i.imgur.com/2IAHziM.png" />
        <link rel="mask-icon" href="https://i.imgur.com/2IAHziM.png" color="#2E5751" />
        <meta name="theme-color" content="#2E5751" />
      </head>
      <body className="flex flex-col min-h-screen">
        <Providers>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          {/* Analytics sans options pour éviter les erreurs de prérenderisation */}
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}