import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, Clock, ChevronLeft, Share2, BookmarkPlus } from 'lucide-react';

interface Article {
  title: string;
  metaDescription: string;
  imageUrl: string;
  content: string;
  date: string;
  author: string;
  readTime?: string;
  category?: string;
}

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: { [key: string]: string | string[] | undefined };
};

// Fonction pour récupérer les métadonnées côté serveur
export async function generateMetadata(
  props: PageProps
): Promise<Metadata> {
  const params = await props.params;
  const slug = params.slug;

  if (!slug) {
    return {
      title: 'Article non trouvé | Tolly',
      description: 'Cet article n\'existe pas ou a été déplacé.',
    };
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/articles?slug=${slug}`);
    if (!response.ok) throw new Error('Article non trouvé');
    const data = await response.json();
    const article = data[0];

    if (!article) {
      return {
        title: 'Article non trouvé | Tolly',
        description: 'Cet article n\'existe pas ou a été déplacé.',
      };
    }

    return {
      title: `${article.title} | Tolly`,
      description: article.metaDescription,
      openGraph: {
        title: article.title,
        description: article.metaDescription,
        images: [{ url: article.imageUrl }],
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/article/${slug}`,
      },
      twitter: {
        card: 'summary_large_image',
        title: article.title,
        description: article.metaDescription,
        images: [article.imageUrl],
      },
    };
  } catch (error) {
    console.error('Erreur de récupération des métadonnées :', error);
    return {
      title: 'Article | Tolly',
      description: 'Article sur Tolly',
    };
  }
}

// Composant Page pour l'affichage de l'article
export default async function ArticlePage(
  props: PageProps
) {
  const params = await props.params;
  const slug = params.slug;
  
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/articles?slug=${slug}`);
  const data = await response.json();
  const article = data[0] as Article;

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <p className="text-red-500 mb-4">Article non trouvé.</p>
        <Link href="/blog" className="inline-flex items-center text-primary hover:text-secondary transition-colors">
          <ChevronLeft className="w-5 h-5 mr-2" />
          Retour au blog
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative h-[50vh] md:h-[60vh] lg:h-[70vh] w-full">
        <Image
          src={article.imageUrl}
          alt={article.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
          className="object-cover"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        <div className="absolute top-4 right-4 flex space-x-2">
          <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors" title="Partager">
            <Share2 className="w-5 h-5 text-white" />
          </button>
          <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors" title="Sauvegarder">
            <BookmarkPlus className="w-5 h-5 text-white" />
          </button>
        </div>

        <Link href="/blog" className="absolute top-4 left-4 inline-flex items-center text-white hover:text-secondary transition-colors">
          <ChevronLeft className="w-5 h-5 mr-2" />
          Retour au blog
        </Link>
      </div>

      <div className="container mx-auto px-4 py-12">
        <article className="-mt-32 relative bg-white rounded-lg shadow-xl p-8 md:p-12 mb-12">
          {article.category && (
            <span className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium mb-6">
              {article.category}
            </span>
          )}

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{article.title}</h1>

          <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8 pb-8 border-b">
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              {new Date(article.date).toLocaleDateString('fr-FR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
            <div className="flex items-center">
              <User className="w-5 h-5 mr-2" />
              {article.author}
            </div>
            {article.readTime && (
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                {article.readTime}
              </div>
            )}
          </div>

          <div
            className="prose prose-lg max-w-none mx-auto prose-headings:text-primary prose-a:text-secondary prose-strong:text-primary prose-blockquote:border-secondary"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </article>
      </div>
    </div>
  );
}