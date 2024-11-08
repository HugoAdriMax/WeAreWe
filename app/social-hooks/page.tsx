// app/social-hooks/page.tsx

import type { Metadata } from 'next';
import SocialHooksGenerator from '@/components/SocialHooksGenerator'; // Import corrigé

export const metadata: Metadata = {
  title: 'Générateur d\'Accroches Social Media AI | Tolly',
  description: 'Créez des accroches captivantes pour vos réseaux sociaux avec notre générateur alimenté par l\'IA. Optimisez vos posts Facebook, Twitter, Instagram et LinkedIn.',
  openGraph: {
    title: 'Générateur d\'Accroches Social Media AI | Tolly',
    description: 'Créez des accroches captivantes pour vos réseaux sociaux avec notre générateur alimenté par l\'IA',
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Tolly'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Générateur d\'Accroches Social Media AI | Tolly',
    description: 'Créez des accroches captivantes pour vos réseaux sociaux avec notre générateur alimenté par l\'IA'
  },
  alternates: {
    canonical: 'https://tolly.fr/social-hooks'
  }
};

export default function SocialHooksPage() {
  return (
    <main>
      <SocialHooksGenerator />
    </main>
  );
}