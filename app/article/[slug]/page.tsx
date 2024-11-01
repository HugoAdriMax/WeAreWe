import { Metadata } from 'next';
import ArticlePage from './ArticlePage';
import JsonLd from '@/components/Seo/JsonLd';

interface PageParams {
  params: {
    slug: string;
  };
}

// Fonction pour récupérer l'article
async function getArticle(slug: string) {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/articles?slug=${slug}`;
  
  try {
    const response = await fetch(apiUrl, { cache: 'no-store' });

    if (!response.ok) {
      throw new Error('Erreur lors du chargement de l\'article');
    }

    const data = await response.json();
    return data[0];
  } catch (error) {
    console.error('Error fetching article:', error);
    return null;
  }
}

// Génération des métadonnées
export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  try {
    const article = await getArticle(params.slug); // Utiliser params.slug directement

    if (!article) {
      return {
        title: 'Article non trouvé | Tolly',
        description: 'Cet article n\'existe pas ou a été déplacé.'
      };
    }

    return {
      title: `${article.title} | Tolly`,
      description: article.metaDescription,
      openGraph: {
        title: article.title,
        description: article.metaDescription,
        type: 'article',
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/article/${params.slug}`, // Utiliser params.slug directement
        images: [
          {
            url: article.imageUrl,
            width: 1200,
            height: 630,
            alt: article.title,
          }
        ],
        siteName: 'Tolly',
      },
      twitter: {
        card: 'summary_large_image',
        title: article.title,
        description: article.metaDescription,
        images: [article.imageUrl],
        creator: '@tolly',
      },
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_API_BASE_URL}/article/${params.slug}`, // Utiliser params.slug directement
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Article | Tolly',
      description: 'Article sur Tolly',
    };
  }
}

export default async function Page({ params }: PageParams) {
  try {
    const article = await getArticle(params.slug); // Utiliser params.slug directement

    if (!article) {
      return null;
    }

    const articleJsonLd = {
      headline: article.title,
      description: article.metaDescription,
      image: article.imageUrl,
      datePublished: article.date,
      author: {
        "@type": "Person",
        name: article.author
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `${process.env.NEXT_PUBLIC_API_BASE_URL}/article/${params.slug}` // Utiliser params.slug directement
      }
    };

    return (
      <>
        <JsonLd 
          type="Article"
          data={articleJsonLd}
        />
        <ArticlePage initialData={article} />
      </>
    );
  } catch (error) {
    console.error('Error rendering page:', error);
    return null;
  }
}
