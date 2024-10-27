"use client";

export default function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Tolly",
    "description": "Agence de marketing digital experte en SEO, développement web et stratégie digitale",
    "url": "https://www.tolly.fr",
    "logo": "https://www.tolly.fr/logo.png",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "FR"
    },
    "sameAs": [
      "https://www.instagram.com/wearewework/",
      // Ajoutez vos autres réseaux sociaux
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "contact@tolly.fr",
      "contactType": "customer service"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}