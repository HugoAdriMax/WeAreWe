// components/Seo/JsonLd.tsx
"use client";

interface JsonLdProps {
  type: 'Organization' | 'Article' | 'WebPage';
  data?: Record<string, any>;
}

export default function JsonLd({ type, data }: JsonLdProps) {
  const getSchema = () => {
    switch (type) {
      case 'Organization':
        return {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Tolly",
          "description": "Agence de marketing digital experte en SEO, développement web et stratégie digitale",
          "url": "https://www.tolly.fr",
          "logo": "https://i.imgur.com/QJup7V0.png",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "FR"
          },
          "sameAs": [
            "https://www.instagram.com/wearewework/"
          ],
          "contactPoint": {
            "@type": "ContactPoint",
            "email": "contact@tolly.fr",
            "contactType": "customer service"
          }
        };

      case 'Article':
        if (!data) {
          throw new Error('Data is required for Article type');
        }
        return {
          "@context": "https://schema.org",
          "@type": "Article",
          ...data,
          "publisher": {
            "@type": "Organization",
            "name": "Tolly",
            "logo": {
              "@type": "ImageObject",
              "url": "https://i.imgur.com/QJup7V0.png"
            }
          }
        };

      case 'WebPage':
        return {
          "@context": "https://schema.org",
          "@type": "WebPage",
          ...data,
          "publisher": {
            "@type": "Organization",
            "name": "Tolly"
          }
        };

      default:
        return data || {};
    }
  };

  try {
    const schema = getSchema();
    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    );
  } catch (error) {
    console.error('Error generating JSON-LD:', error);
    return null;
  }
}