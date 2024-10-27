"use client";

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Pen, Trash2, Plus, Eye, Search } from 'lucide-react';
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
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.metaDescription.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <div className="bg-white rounded-xl shadow-lg p-6">
          {selectedArticle ? (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-primary">
                  {selectedArticle._id ? 'Modifier l\'article' : 'Nouvel article'}
                </h2>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
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
                          .replace(/[^a-z0-9]+/g, '-')
                          .replace(/^-+|-+$/g, '')
                      })}
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
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
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
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
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      rows={2}
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
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="https://url-de-l-image.com"
                    />
                    {selectedArticle.imageUrl && (
                      <div className="mt-2">
                        <img
                          src={selectedArticle.imageUrl}
                          alt="Aperçu"
                          className="w-32 h-32 object-cover rounded-lg"
                        />
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

              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  disabled={isSaving}
                >
                  Annuler
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 
                           flex items-center space-x-2 disabled:opacity-50"
                >
                  {isSaving ? 'Sauvegarde...' : 'Sauvegarder'}
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-primary">
                  Articles ({filteredArticles.length})
                </h1>
                <button
                  onClick={() => setSelectedArticle({
                    _id: '',
                    title: '',
                    slug: '',
                    metaDescription: '',
                    imageUrl: '',
                    content: ''
                  })}
                  className="flex items-center space-x-2 bg-primary text-white px-4 py-2 
                           rounded-lg hover:bg-primary/90"
                >
                  <Plus className="w-4 h-4" />
                  <span>Nouvel Article</span>
                </button>
              </div>

              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Rechercher un article..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 
                             focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>

              <div className="space-y-4">
                {filteredArticles.map(article => (
                  <div
                    key={article._id}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex space-x-4">
                        <div className="relative w-24 h-24">
                          <Image
                            src={article.imageUrl}
                            alt={article.title}
                            fill
                            className="object-cover rounded-lg"
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg text-gray-900">
                            {article.title}
                          </h3>
                          <p className="text-gray-600 text-sm mt-1">
                            {article.metaDescription}
                          </p>
                          <p className="text-gray-400 text-xs mt-2">
                            {new Date(article.date || '').toLocaleDateString('fr-FR')}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handlePreview(article)}
                          className="p-2 text-gray-500 hover:text-primary hover:bg-gray-100 
                                   rounded-lg transition-colors"
                          title="Prévisualiser"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => setSelectedArticle(article)}
                          className="p-2 text-gray-500 hover:text-primary hover:bg-gray-100 
                                   rounded-lg transition-colors"
                          title="Éditer"
                        >
                          <Pen className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(article._id)}
                          className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 
                                   rounded-lg transition-colors"
                          title="Supprimer"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {filteredArticles.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    {searchTerm 
                      ? "Aucun article ne correspond à votre recherche" 
                      : "Aucun article n'a été créé"}
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
