"use client";

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { 
  Pen, 
  Trash2, 
  Plus, 
  Eye, 
  Search, 
  LayoutGrid, 
  List, 
  Calendar,
  Image as ImageIcon,
  FileText,
  ChevronUp,
  ChevronDown
} from 'lucide-react';
import Image from 'next/image';

const EditorComponent = dynamic(() => import('@/components/Editor'), {
  ssr: false,
  loading: () => (
    <div className="animate-pulse bg-gray-200 h-96 rounded-lg flex items-center justify-center">
      <p className="text-gray-500">Chargement de l'éditeur...</p>
    </div>
  ),
});

interface Article {
  _id: string;
  title: string;
  slug: string;
  metaDescription: string;
  imageUrl: string;
  content: string;
  date?: string;
  category?: string;
  author?: string;
}

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: number;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, trend }) => (
  <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition-all duration-300">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <div className="text-gray-400">
        {icon}
      </div>
    </div>
    <div className="flex items-center justify-between">
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      {trend !== undefined && (
        <div className={`flex items-center ${trend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {trend >= 0 ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          <span className="text-sm">{Math.abs(trend)}%</span>
        </div>
      )}
    </div>
  </div>
);

export default function DashboardPage() {

  const { data: session, status } = useSession();
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState('list');
  const [activeTab, setActiveTab] = useState('all');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/cms/login');
    }
  }, [status, router]);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/articles');
      if (!response.ok) throw new Error('Erreur lors du chargement des articles');
      const data = await response.json();
      setArticles(data);
      setError(null);
    } catch (error) {
      setError('Erreur lors du chargement des articles');
      console.error('Erreur:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) return;

    try {
      const response = await fetch(`/api/articles/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Erreur lors de la suppression');

      setArticles(articles.filter(article => article._id !== id));
      setError(null);
    } catch (error) {
      setError('Erreur lors de la suppression');
      console.error('Erreur:', error);
    }
  };

  const handleSave = async () => {
    if (!selectedArticle) return;
    setIsSaving(true);

    try {
      const method = selectedArticle._id ? 'PUT' : 'POST';
      const url = selectedArticle._id
        ? `/api/articles/${selectedArticle._id}`
        : '/api/articles';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...selectedArticle,
          date: selectedArticle.date || new Date().toISOString(),
          author: selectedArticle.author || 'Admin'
        }),
      });

      if (!response.ok) throw new Error('Erreur lors de la sauvegarde');

      await fetchArticles();
      setSelectedArticle(null);
      setError(null);
    } catch (error) {
      setError('Erreur lors de la sauvegarde');
      console.error('Erreur:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handlePreview = (article: Article) => {
    window.open(`/article/${article.slug}`, '_blank');
  };

  const handleSort = () => {
    setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  const getSortedAndFilteredArticles = () => {
    let filtered = articles.filter(article => {
      const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          article.metaDescription.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (activeTab === 'recent') {
        return matchesSearch && new Date(article.date || '').getMonth() === new Date().getMonth();
      }
      if (activeTab === 'images') {
        return matchesSearch && article.imageUrl;
      }
      return matchesSearch;
    });

    return filtered.sort((a, b) => {
      const dateA = new Date(a.date || '').getTime();
      const dateB = new Date(b.date || '').getTime();
      return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
    });
  };

  const filteredArticles = getSortedAndFilteredArticles();

  const getStats = () => {
    const total = articles.length;
    const thisMonth = articles.filter(a => new Date(a.date || '').getMonth() === new Date().getMonth()).length;
    const withImages = articles.filter(a => a.imageUrl).length;
    const lastPublished = articles[0]?.date ? new Date(articles[0].date).toLocaleDateString('fr-FR') : '-';
    
    // Calcul de la tendance (% de croissance par rapport au mois dernier)
    const lastMonth = articles.filter(a => {
      const date = new Date(a.date || '');
      const lastMonthDate = new Date();
      lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
      return date.getMonth() === lastMonthDate.getMonth();
    }).length;
    
    const trend = lastMonth ? ((thisMonth - lastMonth) / lastMonth) * 100 : 0;

    return { total, thisMonth, withImages, lastPublished, trend };
  };

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary">
          <div className="sr-only">Chargement...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <StatCard
            title="Total Articles"
            value={getStats().total}
            icon={<FileText className="w-6 h-6" />}
          />
          <StatCard
            title="Ce mois"
            value={getStats().thisMonth}
            icon={<Calendar className="w-6 h-6" />}
            trend={getStats().trend}
          />
          <StatCard
            title="Dernière publication"
            value={getStats().lastPublished}
            icon={<Calendar className="w-6 h-6" />}
          />
          <StatCard
            title="Articles avec images"
            value={getStats().withImages}
            icon={<ImageIcon className="w-6 h-6" />}
          />
        </div>

        {error && (
          <div className="animate-fadeIn bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm">{error}</p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-lg">
          {selectedArticle ? (
            <div className="p-6 space-y-6">
              <div className="flex justify-between items-center border-b border-gray-100 pb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedArticle._id ? 'Modifier l\'article' : 'Nouvel article'}
                </h2>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Titre
                    </label>
                    <input
                      type="text"
                      value={selectedArticle.title}
                      onChange={(e) => setSelectedArticle({
                        ...selectedArticle,
                        title: e.target.value,
                        slug: e.target.value
                          .toLowerCase()
                          .normalize('NFD')
                          .replace(/[\u0300-\u036f]/g, '')
                          .replace(/[^a-z0-9]+/g, '-')
                          .replace(/^-+|-+$/g, '')
                      })}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
                      placeholder="Titre de l'article"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Slug
                    </label>
                    <input
                      type="text"
                      value={selectedArticle.slug}
                      onChange={(e) => setSelectedArticle({
                        ...selectedArticle,
                        slug: e.target.value
                      })}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
                      placeholder="slug-de-l-article"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Meta Description
                    </label>
                    <textarea
                      value={selectedArticle.metaDescription}
                      onChange={(e) => setSelectedArticle({
                        ...selectedArticle,
                        metaDescription: e.target.value
                      })}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
                      rows={3}
                      placeholder="Description pour les moteurs de recherche"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      URL de l'image
                    </label>
                    <input
                      type="text"
                      value={selectedArticle.imageUrl}
                      onChange={(e) => setSelectedArticle({
                        ...selectedArticle,
                        imageUrl: e.target.value
                      })}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
                      placeholder="https://exemple.com/image.jpg"
                    />
                    {selectedArticle.imageUrl && (
                      <div className="mt-2 relative">
                        <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                          <Image
                            src={selectedArticle.imageUrl}
                            alt="Aperçu"
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contenu
                </label>
                <EditorComponent
                  initialValue={selectedArticle.content}
                  onSave={(content) => setSelectedArticle({
                    ...selectedArticle,
                    content
                  })}
                />
              </div>

              <div className="flex justify-end items-center space-x-4 pt-6 border-t border-gray-100">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="px-6 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  disabled={isSaving}
                >
                  Annuler
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 
                           transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  {isSaving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                      <span>Sauvegarde...</span>
                    </>
                  ) : (
                    <span>Sauvegarder</span>
                  )}
                </button>
              </div>
            </div>
          ) : (<>
            <div className="p-6 border-b border-gray-100">
              <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <div className="flex items-center">
                  <h1 className="text-2xl font-bold text-gray-900">
                    Articles <span className="text-primary">({filteredArticles.length})</span>
                  </h1>
                </div>
                <button
                  onClick={() => setSelectedArticle({
                    _id: '',
                    title: '',
                    slug: '',
                    metaDescription: '',
                    imageUrl: '',
                    content: '',
                    author: 'Admin'
                  })}
                  className="flex items-center justify-center gap-2 bg-primary text-white px-4 py-2 
                           rounded-lg hover:bg-primary/90 transition-colors shadow-sm hover:shadow"
                >
                  <Plus className="w-5 h-5" />
                  <span>Nouvel Article</span>
                </button>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Rechercher un article..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 
                             focus:ring-primary focus:border-transparent transition-shadow"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2.5 rounded-lg transition-colors ${
                      viewMode === 'grid' 
                        ? 'bg-primary text-white' 
                        : 'text-gray-400 hover:bg-gray-100'
                    }`}
                    title="Vue grille"
                  >
                    <LayoutGrid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2.5 rounded-lg transition-colors ${
                      viewMode === 'list' 
                        ? 'bg-primary text-white' 
                        : 'text-gray-400 hover:bg-gray-100'
                    }`}
                    title="Vue liste"
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {['all', 'recent', 'images'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      activeTab === tab
                        ? 'bg-primary text-white shadow-sm'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {tab === 'all' && 'Tous les articles'}
                    {tab === 'recent' && 'Articles récents'}
                    {tab === 'images' && 'Avec images'}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-hidden">
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                  {filteredArticles.map(article => (
                    <div key={article._id} className="group bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                      <div className="relative aspect-video">
                        <Image
                          src={article.imageUrl}
                          alt={article.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <div className="p-5">
                        <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                          {article.title}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                          {article.metaDescription}
                        </p>
                        <div className="flex justify-between items-center">
                          <time className="text-xs text-gray-400">
                            {new Date(article.date || '').toLocaleDateString('fr-FR')}
                          </time>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handlePreview(article)}
                              className="p-2 text-gray-500 hover:text-primary hover:bg-gray-100 rounded-lg transition-all"
                              title="Prévisualiser"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setSelectedArticle(article)}
                              className="p-2 text-gray-500 hover:text-primary hover:bg-gray-100 rounded-lg transition-all"
                              title="Éditer"
                            >
                              <Pen className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(article._id)}
                              className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                              title="Supprimer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {filteredArticles.map(article => (
                    <div
                      key={article._id}
                      className="group p-6 hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <div className="flex flex-col sm:flex-row gap-6">
                        <div className="relative w-full sm:w-48 aspect-video rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={article.imageUrl}
                            alt={article.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col h-full">
                            <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                              {article.title}
                            </h3>
                            <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                              {article.metaDescription}
                            </p>
                            <div className="mt-auto flex flex-wrap items-center justify-between gap-4">
                              <div className="flex items-center gap-4">
                                <time className="text-sm text-gray-400">
                                  {new Date(article.date || '').toLocaleDateString('fr-FR')}
                                </time>
                                <span className="h-1 w-1 bg-gray-300 rounded-full"></span>
                                <span className="text-sm text-gray-500">
                                  {article.author || 'Admin'}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handlePreview(article);
                                  }}
                                  className="p-2 text-gray-500 hover:text-primary hover:bg-gray-100 rounded-lg transition-colors"
                                  title="Prévisualiser"
                                >
                                  <Eye className="w-5 h-5" />
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedArticle(article);
                                  }}
                                  className="p-2 text-gray-500 hover:text-primary hover:bg-gray-100 rounded-lg transition-colors"
                                  title="Éditer"
                                >
                                  <Pen className="w-5 h-5" />
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(article._id);
                                  }}
                                  className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                  title="Supprimer"
                                >
                                  <Trash2 className="w-5 h-5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {filteredArticles.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 px-4">
                  <div className="text-gray-400 mb-4">
                    <FileText className="w-12 h-12" />
                  </div>
                  <p className="text-lg font-medium text-gray-900 mb-2">
                    {searchTerm ? "Aucun article ne correspond à votre recherche" : "Aucun article"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {searchTerm ? "Essayez d'autres termes de recherche" : "Commencez par créer votre premier article"}
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  </div>
);
}