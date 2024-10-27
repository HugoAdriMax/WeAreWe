"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Filter, Calendar, User, Clock, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface Article {
  _id: string;
  title: string;
  slug: string;
  metaDescription: string;
  imageUrl: string;
  date: string;
  author: string;
  category?: string;
  readTime?: string;
}

const ARTICLES_PER_PAGE = 9;

const categories = ['all', 'SEO', 'Web Design', 'Marketing', 'E-commerce']
  .map(cat => ({
    id: cat.toLowerCase().replace(' ', '-'),
    label: cat === 'all' ? 'Tous les articles' : cat
  }));

  export default function BlogPage() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
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
          const data = await response.json();
          setArticles(data);
          setFilteredArticles(data);
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
          article.metaDescription.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
        return matchesSearch && matchesCategory;
      });
      setFilteredArticles(filtered);
      setCurrentPage(1);
    }, [searchTerm, selectedCategory, articles]);
  
    // Logique de pagination
    const totalPages = Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE);
    const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
    const endIndex = startIndex + ARTICLES_PER_PAGE;
    const currentArticles = filteredArticles.slice(startIndex, endIndex);
  
    const goToPage = (page: number) => {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Composant de pagination
  const Pagination = () => {
    return (
      <div className="flex justify-center items-center space-x-2 mt-12">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`p-2 rounded-full ${
            currentPage === 1 
              ? 'text-gray-400 cursor-not-allowed' 
              : 'text-primary hover:bg-primary/10'
          }`}
        >
          <ChevronLeft size={24} />
        </button>
        
        {[...Array(totalPages)].map((_, index) => {
          const pageNumber = index + 1;
          const isCurrentPage = pageNumber === currentPage;
          const isNearCurrent = Math.abs(pageNumber - currentPage) <= 1;
          const isEndPage = pageNumber === 1 || pageNumber === totalPages;

          if (!isNearCurrent && !isEndPage) {
            if (pageNumber === 2 || pageNumber === totalPages - 1) {
              return <span key={pageNumber} className="text-gray-400">...</span>;
            }
            return null;
          }

          return (
            <button
              key={pageNumber}
              onClick={() => goToPage(pageNumber)}
              className={`w-10 h-10 rounded-full ${
                isCurrentPage
                  ? 'bg-primary text-white'
                  : 'text-gray-600 hover:bg-primary/10'
              }`}
            >
              {pageNumber}
            </button>
          );
        })}

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`p-2 rounded-full ${
            currentPage === totalPages 
              ? 'text-gray-400 cursor-not-allowed' 
              : 'text-primary hover:bg-primary/10'
          }`}
        >
          <ChevronRight size={24} />
        </button>
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
      {/* Hero Section */}
      <div className="bg-primary text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
            Notre Blog
          </h1>
          <p className="text-xl text-center max-w-2xl mx-auto mb-12">
            Découvrez nos derniers articles, conseils et actualités sur le marketing digital
          </p>
          
          {/* Barre de recherche */}
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
        {/* Filtres par catégorie */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all
                ${category.id === selectedCategory
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'}`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Grille d'articles */}
        {currentArticles.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentArticles.map((article) => (
                <Link
                  key={article._id}
                  href={`/article/${article.slug}`}
                  className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl 
                           transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={article.imageUrl}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    {article.category && (
                      <span className="absolute top-4 right-4 bg-primary/80 backdrop-blur-sm text-white 
                                   px-3 py-1 rounded-full text-sm font-medium">
                        {article.category}
                      </span>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-primary 
                                 transition-colors">
                      {article.title}
                    </h2>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {article.metaDescription}
                    </p>
                    
                    <div className="flex justify-between items-center">
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
            
            {/* Pagination */}
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