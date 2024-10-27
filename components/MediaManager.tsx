"use client";

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Upload, X, Search, Loader } from 'lucide-react';

interface Media {
  _id: string;
  url: string;
  filename: string;
  createdAt: string;
}

interface MediaManagerProps {
  onSelect: (url: string) => void;
  onClose: () => void;
}

export default function MediaManager({ onSelect, onClose }: MediaManagerProps) {
  const [medias, setMedias] = useState<Media[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  // Charger les médias au montage du composant
  useEffect(() => {
    fetchMedias();
  }, []);

  // Fonction pour charger les médias
  const fetchMedias = async () => {
    try {
      const response = await fetch('/api/media');
      if (!response.ok) throw new Error('Erreur lors du chargement des médias');
      const data = await response.json();
      setMedias(data);
      setError(null);
    } catch (error) {
      setError('Erreur lors du chargement des médias');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction pour uploader une image
  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Vérifier le type de fichier
    if (!file.type.startsWith('image/')) {
      setError('Seules les images sont autorisées');
      return;
    }

    // Vérifier la taille du fichier (par exemple, limite à 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('La taille du fichier ne doit pas dépasser 5MB');
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/media/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Erreur lors de l\'upload');
      
      await fetchMedias(); // Recharger la liste des médias
      setError(null);
    } catch (error) {
      setError('Erreur lors de l\'upload du fichier');
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  // Filtrer les médias selon la recherche
  const filteredMedias = medias.filter(media =>
    media.filename.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">
            Gestionnaire de médias
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Barre d'outils */}
        <div className="p-4 border-b flex justify-between items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
            />
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleUpload}
            accept="image/*"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg 
                     hover:bg-primary/90 disabled:opacity-50"
          >
            {isUploading ? (
              <Loader className="w-5 h-5 animate-spin" />
            ) : (
              <Upload className="w-5 h-5" />
            )}
            Uploader
          </button>
        </div>

        {/* Message d'erreur */}
        {error && (
          <div className="p-4 bg-red-50 text-red-600 text-sm">
            {error}
          </div>
        )}

        {/* Grille des médias */}
        <div className="p-4 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 200px)' }}>
          {isLoading ? (
            <div className="flex justify-center items-center h-48">
              <Loader className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : filteredMedias.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {filteredMedias.map((media) => (
                <button
                  key={media._id}
                  onClick={() => onSelect(media.url)}
                  className="group relative aspect-square rounded-lg overflow-hidden 
                           border-2 hover:border-primary focus:border-primary focus:outline-none"
                >
                  <Image
                    src={media.url}
                    alt={media.filename}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 
                               transition-opacity flex items-center justify-center">
                    <span className="text-white text-sm">Sélectionner</span>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-12">
              {searchTerm ? "Aucun média ne correspond à votre recherche" : "Aucun média disponible"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}