"use client";

import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Copy, 
  CheckCircle2,
  Sparkles,
  Loader2
} from 'lucide-react';

interface ContentType {
  id: string;
  name: string;
  prompt: string;
}

interface Platform {
  id: string;
  name: string;
  icon: React.ElementType;
}

interface FormData {
  product: string;
  topic: string;
  keywords: string;
}

const contentTypes: ContentType[] = [
  { id: 'promotion', name: 'Promotion', prompt: "Créez une accroche promotionnelle engageante" },
  { id: 'engagement', name: 'Engagement', prompt: "Créez une accroche qui suscite l'interaction" },
  { id: 'information', name: 'Information', prompt: "Créez une accroche informative captivante" },
  { id: 'storytelling', name: 'Storytelling', prompt: "Créez une accroche narrative immersive" }
];

const platforms: Platform[] = [
  { id: 'facebook', name: 'Facebook', icon: Facebook },
  { id: 'twitter', name: 'Twitter', icon: Twitter },
  { id: 'instagram', name: 'Instagram', icon: Instagram },
  { id: 'linkedin', name: 'LinkedIn', icon: Linkedin }
];

export default function SocialHooksGenerator(): JSX.Element {
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>(platforms[0]);
  const [selectedType, setSelectedType] = useState<ContentType>(contentTypes[0]);
  const [formData, setFormData] = useState<FormData>({
    product: '',
    topic: '',
    keywords: ''
  });
  const [generatedHooks, setGeneratedHooks] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const generatePrompt = (): string => {
    const type = contentTypes.find(t => t.id === selectedType.id);
    if (!type) return '';
    
    return `${type.prompt} pour ${selectedPlatform.name} avec ces éléments :
    - Produit/Service : ${formData.product}
    - Sujet : ${formData.topic}
    - Mots-clés : ${formData.keywords}
    
    Règles :
    - Utilisez le ton approprié pour ${selectedPlatform.name}
    - Incluez des emojis pertinents
    - Créez 5 versions différentes
    - Respectez les limites de caractères de ${selectedPlatform.name}
    - Rendez le message accrocheur et engageant
    - Adaptez le style au contexte professionnel si c'est pour LinkedIn
    
    Format : Retournez uniquement les 5 accroches, une par ligne`;
  };

  const generateHooks = async (): Promise<void> => {
    if (!formData.product && !formData.topic) {
      setError("Veuillez remplir au moins le produit ou le sujet");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch('/api/generate-hooks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: generatePrompt(),
          platform: selectedPlatform.id,
          type: selectedType.id
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la génération des accroches');
      }

      const data: { hooks: string[] } = await response.json();
      setGeneratedHooks(data.hooks);
    } catch (err) {
      setError("Une erreur est survenue lors de la génération des accroches");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string): void => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="pt-32 pb-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-secondary font-semibold mb-4 block"
          >
            GÉNÉRATEUR D'ACCROCHES IA
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold text-primary mb-6"
          >
            Créez des accroches captivantes avec l'IA
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-600"
          >
            Générez des accroches optimisées pour chaque réseau social
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Type de contenu */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Type de contenu</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {contentTypes.map((type) => (
                <motion.button
                  key={type.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setSelectedType(type)}
                  className={`p-4 rounded-xl text-center transition-colors
                    ${selectedType.id === type.id 
                      ? 'bg-secondary text-white' 
                      : 'bg-gray-50 hover:bg-gray-100'}`}
                >
                  <span className="text-sm font-medium">{type.name}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Plateformes */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Plateforme</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {platforms.map((platform) => (
                <motion.button
                  key={platform.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setSelectedPlatform(platform)}
                  className={`p-4 rounded-xl flex flex-col items-center gap-2 transition-colors
                    ${selectedPlatform.id === platform.id 
                      ? 'bg-secondary text-white' 
                      : 'bg-gray-50 hover:bg-gray-100'}`}
                >
                  <platform.icon className="w-6 h-6" />
                  <span className="text-sm font-medium">{platform.name}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Formulaire */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-6 bg-gray-50 p-6 rounded-2xl mb-8"
          >
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Produit/Service
                </label>
                <input
                  type="text"
                  value={formData.product}
                  onChange={(e) => setFormData({...formData, product: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 
                           focus:ring-secondary focus:border-transparent"
                  placeholder="Ex: Formation en marketing digital"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sujet/Thème
                </label>
                <input
                  type="text"
                  value={formData.topic}
                  onChange={(e) => setFormData({...formData, topic: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 
                           focus:ring-secondary focus:border-transparent"
                  placeholder="Ex: L'importance du personal branding"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mots-clés (séparés par des virgules)
                </label>
                <input
                  type="text"
                  value={formData.keywords}
                  onChange={(e) => setFormData({...formData, keywords: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 
                           focus:ring-secondary focus:border-transparent"
                  placeholder="Ex: marketing, digital, formation, carrière"
                />
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-sm">{error}</div>
            )}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={generateHooks}
              disabled={isLoading}
              className="w-full bg-secondary text-white py-3 rounded-xl flex items-center 
                       justify-center gap-2 hover:bg-secondary/90 transition-colors
                       disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Sparkles className="w-5 h-5" />
              )}
              {isLoading ? 'Génération en cours...' : 'Générer des accroches'}
            </motion.button>
          </motion.div>

          {/* Résultats */}
          {generatedHooks.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-semibold mb-4">Accroches générées</h3>
              {generatedHooks.map((hook, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative bg-gray-50 p-4 rounded-xl group"
                >
                  <p className="pr-10">{hook}</p>
                  <button
                    onClick={() => copyToClipboard(hook)}
                    className="absolute top-4 right-4 p-2 opacity-0 group-hover:opacity-100 
                             transition-opacity rounded-lg hover:bg-gray-200"
                  >
                    <Copy className="w-4 h-4 text-gray-600" />
                  </button>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}