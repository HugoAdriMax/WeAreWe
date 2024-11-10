"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Calendar, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react';

interface Tag {
  id: string;
  label: string;
  weight: number;
}

interface Article {
  _id: string;
  title: string;
  slug: string;
  metaDescription: string;
  imageUrl: string;
  date: string;
  author: string;
}

interface ArticleWithTags extends Article {
  tags: Tag[];
  category: string;
}

const ARTICLES_PER_PAGE = 9;

const categories = ['all', 'SEO', 'Web Design', 'Marketing', 'E-commerce']
  .map(cat => ({
    id: cat.toLowerCase().replace(' ', '-'),
    label: cat === 'all' ? 'Tous les articles' : cat
  }));

// Mots-clés plus spécifiques avec leur poids pour la catégorisation
const keywordsByCategory = {
  'SEO': {
    primary: ['seo', 'référencement naturel', 'optimisation moteur recherche'],
    secondary: ['référencement', 'google', 'ranking', 'backlinks', 'mots-clés', 'analytics', 'serp', 'position'],
    context: ['site web', 'trafic', 'visibilité']
  },
  'Web Design': {
    primary: ['web design', 'webdesign', 'conception web', 'design interface'],
    secondary: ['ui', 'ux', 'responsive', 'mobile', 'design', 'interface', 'maquette'],
    context: ['utilisateur', 'ergonomie', 'navigation']
  },
  'Marketing': {
    primary: ['marketing digital', 'stratégie marketing', 'inbound marketing'],
    secondary: ['stratégie', 'social media', 'conversion', 'communication', 'marketing', 'acquisition'],
    context: ['marque', 'audience', 'client']
  },
  'E-commerce': {
    primary: ['e-commerce', 'commerce en ligne', 'boutique en ligne'],
    secondary: ['vente', 'boutique', 'shop', 'conversion', 'panier', 'marketplace'],
    context: ['produit', 'achat', 'client']
  }
};

// Mots à exclure des tags
const excludedWords = new Set([
  'le', 'la', 'les', 'un', 'une', 'des', 'ce', 'ces', 'sur', 'pour', 'dans',
  'avec', 'par', 'est', 'sont', 'être', 'avoir', 'fait', 'faire', 'plus',
  'vous', 'nous', 'ils', 'elles', 'leur', 'leurs', 'tout', 'tous', 'cette',
  'votre', 'notre', 'comment', 'quoi', 'quel', 'quelle', 'aussi', 'donc'
]);

function getContentScore(content: string, keywords: string[]): number {
  const normalizedContent = content.toLowerCase();
  return keywords.reduce((score, keyword) => {
    const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
    const matches = normalizedContent.match(regex);
    return score + (matches ? matches.length : 0);
  }, 0);
}

function determineCategory(article: Article): string {
  const content = `${article.title} ${article.metaDescription}`.toLowerCase();
  let bestCategory = 'Autres';
  let highestScore = 0;

  for (const [category, keywords] of Object.entries(keywordsByCategory)) {
    const primaryScore = getContentScore(content, keywords.primary) * 3;
    const secondaryScore = getContentScore(content, keywords.secondary) * 2;
    const contextScore = getContentScore(content, keywords.context);
    
    const totalScore = primaryScore + secondaryScore + contextScore;
    
    if (totalScore > highestScore) {
      highestScore = totalScore;
      bestCategory = category;
    }
  }

  // Ne retourne une catégorie que si le score est suffisant
  return highestScore >= 2 ? bestCategory : 'Autres';
}

function generateTags(article: Article): Tag[] {
  const content = `${article.title} ${article.metaDescription}`.toLowerCase();
  const words = content.split(/[\s,.-]+/);
  const tagCandidates = new Map<string, number>();

  // Première passe : compte la fréquence des mots
  words.forEach(word => {
    if (word.length > 4 && !excludedWords.has(word)) {
      tagCandidates.set(word, (tagCandidates.get(word) || 0) + 1);
    }
  });

  // Deuxième passe : vérifie les expressions composées
  const contentNormalized = content.toLowerCase();
  for (const category of Object.values(keywordsByCategory)) {
    [...category.primary, ...category.secondary].forEach(keyword => {
      if (keyword.includes(' ') && contentNormalized.includes(keyword)) {
        tagCandidates.set(keyword, (tagCandidates.get(keyword) || 0) + 2);
      }
    });
  }

  // Convertit en tableau de tags et trie par pertinence
  const tags: Tag[] = Array.from(tagCandidates.entries())
    .map(([label, weight]) => ({
      id: label.replace(/\s+/g, '-'),
      label,
      weight
    }))
    .sort((a, b) => b.weight - a.weight)
    .slice(0, 5);

  return tags;
}

export default function BlogPage() {
  const [articles, setArticles] = useState<ArticleWithTags[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<ArticleWithTags[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  
  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await fetch('/api/articles');
        if (!response.ok) throw new Error('Erreur lors du chargement des articles');
        const data: Article[] = await response.json();
        
        const articlesWithTags: ArticleWithTags[] = data.map(article => ({
          ...article,
          tags: generateTags(article),
          category: determineCategory(article)
        }));

        setArticles(articlesWithTags);
        setFilteredArticles(articlesWithTags);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Une erreur est survenue');
      } finally {
        setIsLoading(false);
      }
    }
    fetchArticles();
  }, []);
  
  useEffect(() => {
    const filtered = articles.filter(article => {
      const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.metaDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.tags.some(tag => tag.label.includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || article.category.toLowerCase() === selectedCategory;
      return matchesSearch && matchesCategory;
    });
    setFilteredArticles(filtered);
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, articles]);
  
  const totalPages = Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE);
  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
  const endIndex = startIndex + ARTICLES_PER_PAGE;
  const currentArticles = filteredArticles.slice(startIndex, endIndex);
  
  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const Pagination = () => {
    return (
      <div className="flex justify-center items-center space-x-2 mt-12">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`p-2 rounded-full ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-primary hover:bg-primary/10'}`}
        >
          <ChevronLeft size={24} />
        </button>
        
        {[...Array(totalPages)].map((_, index) => {
          const pageNumber = index + 1;
          return (
            <button
              key={pageNumber}
              onClick={() => goToPage(pageNumber)}
              className={`w-10 h-10 rounded-full ${pageNumber === currentPage ? 'bg-primary text-white' : 'text-gray-600 hover:bg-primary/10'}`}
            >
              {pageNumber}
            </button>
          );
        })}

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`p-2 rounded-full ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-primary hover:bg-primary/10'}`}
        >
          <ChevronRight size={24} />
        </button>
      </div>
    );
  };

  const ArticleTags: React.FC<{ tags: Tag[] }> = ({ tags }) => {
    return (
      <div className="flex flex-wrap gap-2 mt-3">
        {tags.map((tag) => (
          <span
            key={tag.id}
            onClick={() => setSearchTerm(tag.label)}
            className="cursor-pointer px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full hover:bg-gray-200"
          >
            #{tag.label}
          </span>
        ))}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 text-red-500 p-4 rounded-lg shadow">
          <p className="font-semibold">Une erreur est survenue</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-primary text-white pt-32 pb-16 md:py-30 relative mt-16 md:mt-0">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">Notre Blog</h1>
          <p className="text-xl text-center max-w-2xl mx-auto mb-12">
            Découvrez nos derniers articles, conseils et actualités sur le marketing digital
          </p>
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un article..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full bg-white/10 backdrop-blur-sm 
                       border border-white/20 text-white placeholder-white/60 focus:outline-none 
                       focus:ring-2 focus:ring-white/50"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${category.id === selectedCategory ? 'bg-primary text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {currentArticles.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentArticles.map((article) => (
                <Link
                  key={article._id}
                  href={`/article/${article.slug}`}
                  className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={decodeURIComponent(article.imageUrl)}
                      alt={article.title}
                      fill
                      sizes="100vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <span className="absolute top-4 right-4 bg-primary/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                      {article.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-primary transition-colors">
                      {article.title}
                    </h2>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {article.metaDescription}
                    </p>
                    <ArticleTags tags={article.tags} />
                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(article.date).toLocaleDateString('fr-FR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                      <span className="inline-flex items-center text-primary group-hover:translate-x-1 transition-transform">
                        Lire la suite <ArrowRight className="ml-2 w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            {totalPages > 1 && <Pagination />}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">Aucun article ne correspond à votre recherche</p>
          </div>
        )}
      </div>
    </div>
  );
}