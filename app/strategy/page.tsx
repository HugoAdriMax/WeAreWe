"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Target, 
  TrendingUp, 
  Users, 
  LineChart, 
  CheckCircle,
  ArrowRight,
  RefreshCw,
  Sparkles
} from 'lucide-react';

interface FormData {
  industry: string;
  target: string;
  budget: string;
  goals: string[];
  timeline: string;
}

interface Strategy {
  objectives: string[];
  channels: string[];
  tactics: string[];
  kpis: string[];
  budget: {
    min: number;
    max: number;
  };
  timeline: string;
}

export default function StrategyPage() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    industry: '',
    target: '',
    budget: '',
    goals: [],
    timeline: ''
  });
  const [strategy, setStrategy] = useState<Strategy | null>(null);

  const businessGoals = [
    'Augmentation du trafic web',
    'Génération de leads',
    'Conversion des ventes',
    'Notoriété de la marque',
    'Engagement sur les réseaux sociaux',
    'Fidélisation client'
  ];

  // Progression steps avec icônes
  const steps = [
    { number: 1, title: 'Informations', icon: Users },
    { number: 2, title: 'Objectifs', icon: Target },
    { number: 3, title: 'Timeline', icon: LineChart },
    { number: 4, title: 'Résultats', icon: Sparkles },
  ];

  const handleGoalToggle = (goal: string) => {
    setFormData(prev => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal]
    }));
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleGenerateStrategy = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/generate-strategy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error('Erreur lors de la génération de la stratégie');
      }

      const data = await response.json();
      setStrategy(data);
      setStep(4);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.industry && formData.target && formData.budget;
      case 2:
        return formData.goals.length > 0;
      case 3:
        return formData.timeline;
      default:
        return true;
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#2E5751] to-[#1a3330]">
      {/* Hero Section */}
      <section className="pt-28 pb-20 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 text-[#FBD3C6] font-medium text-sm tracking-wider mb-4">
                <Sparkles className="w-5 h-5" />
                POWERED BY AI
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Générez votre stratégie marketing personnalisée
              </h1>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Un plan marketing détaillé et actionnable en quelques minutes, 
                adapté à votre secteur et vos objectifs.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Progress Steps */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 mb-8">
              <div className="flex justify-between relative">
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-700 -translate-y-1/2 z-0" />
                <div 
                  className="absolute top-1/2 left-0 h-1 bg-[#B9684F] -translate-y-1/2 z-0 transition-all duration-300" 
                  style={{ width: `${((step - 1) / 3) * 100}%` }} 
                />
                {steps.map((s) => {
                  const Icon = s.icon;
                  return (
                    <div key={s.number} className="relative z-10 flex flex-col items-center">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                        s.number <= step 
                          ? 'bg-[#B9684F] text-white' 
                          : 'bg-gray-700 text-gray-400'
                      }`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className={`text-sm mt-2 ${
                        s.number <= step ? 'text-[#FBD3C6]' : 'text-gray-400'
                      }`}>
                        {s.title}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Form Container */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              {step === 1 && (
                <div className="p-8">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                    Informations de base
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Secteur d'activité
                      </label>
                      <input
                        type="text"
                        value={formData.industry}
                        onChange={(e) => handleInputChange('industry', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E5751] focus:border-transparent"
                        placeholder="Ex: E-commerce, B2B, Services..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cible principale
                      </label>
                      <input
                        type="text"
                        value={formData.target}
                        onChange={(e) => handleInputChange('target', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E5751] focus:border-transparent"
                        placeholder="Ex: PME, Particuliers 25-35 ans..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Budget mensuel estimé
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => handleInputChange('budget', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E5751] focus:border-transparent"
                      >
                        <option value="">Sélectionnez un budget</option>
                        <option value="small">500€ - 1000€</option>
                        <option value="medium">1000€ - 3000€</option>
                        <option value="large">3000€ - 5000€</option>
                        <option value="enterprise">5000€+</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="p-8">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                    Objectifs marketing
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {businessGoals.map((goal) => (
                      <button
                        key={goal}
                        onClick={() => handleGoalToggle(goal)}
                        className={`p-4 rounded-lg border text-left transition-all ${
                          formData.goals.includes(goal)
                            ? 'border-[#B9684F] bg-[#B9684F]/5 text-[#B9684F]'
                            : 'border-gray-200 hover:border-[#B9684F]/50'
                        }`}
                      >
                        <CheckCircle className={`w-5 h-5 mb-2 ${
                          formData.goals.includes(goal) ? 'text-[#B9684F]' : 'text-gray-400'
                        }`} />
                        <span className="block font-medium">{goal}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="p-8">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                    Timeline du projet
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {['3 mois', '6 mois', '12 mois'].map((time) => (
                      <button
                        key={time}
                        onClick={() => handleInputChange('timeline', time)}
                        className={`p-6 rounded-lg border text-center transition-all ${
                          formData.timeline === time
                            ? 'border-[#B9684F] bg-[#B9684F]/5 text-[#B9684F]'
                            : 'border-gray-200 hover:border-[#B9684F]/50'
                        }`}
                      >
                        <span className="block text-2xl font-bold mb-2">{time}</span>
                        <span className="block text-sm text-gray-500">
                          {time === '3 mois' ? 'Court terme' : 
                           time === '6 mois' ? 'Moyen terme' : 'Long terme'}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 4 && strategy && (
                <div className="p-8">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                    Votre stratégie personnalisée
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-6 rounded-xl">
                      <h3 className="text-lg font-semibold mb-4">Objectifs</h3>
                      <ul className="space-y-2">
                        {strategy.objectives.map((objective, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-[#B9684F] shrink-0 mt-0.5" />
                            <span>{objective}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-xl">
                      <h3 className="text-lg font-semibold mb-4">Canaux</h3>
                      <ul className="space-y-2">
                        {strategy.channels.map((channel, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-[#B9684F] shrink-0 mt-0.5" />
                            <span>{channel}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="bg-gray-50 px-8 py-4 flex justify-between">
                <button
                  onClick={() => setStep(prev => Math.max(1, prev - 1))}
                  className="px-6 py-2 text-gray-600 hover:text-[#2E5751] transition-colors disabled:opacity-50"
                  disabled={step === 1}
                >
                  Retour
                </button>
                {step === 3 ? (
                  <button
                    onClick={handleGenerateStrategy}
                    disabled={isLoading || !isStepValid()}
                    className="inline-flex items-center gap-2 px-6 py-2 bg-[#B9684F] text-white rounded-lg
                             hover:bg-[#B9684F]/90 transition-colors disabled:opacity-50"
                  >
                    {isLoading ? (
                      <>
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        Génération en cours...
                      </>
                    ) : (
                      <>
                        Générer la stratégie
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    onClick={() => setStep(prev => prev + 1)}
                    disabled={!isStepValid()}
                    className="inline-flex items-center gap-2 px-6 py-2 bg-[#B9684F] text-white rounded-lg
                             hover:bg-[#B9684F]/90 transition-colors disabled:opacity-50"
                  >
                    Suivant
                    <ArrowRight className="w-5 h-5" />
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section - Optionnel */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: "IA Avancée",
                description: "Notre algorithme analyse votre secteur et vos objectifs pour créer une stratégie sur mesure"
              },
              {
                title: "Plan Détaillé",
                description: "Obtenez un plan d'action complet avec objectifs, tactiques et KPIs"
              },
              {
                title: "Mise en œuvre Simple",
                description: "Des recommandations claires et actionnables pour votre stratégie marketing"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 text-center"
              >
                <h3 className="text-[#FBD3C6] text-lg font-semibold mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}