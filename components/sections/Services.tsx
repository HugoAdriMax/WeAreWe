"use client";

import { motion } from 'framer-motion';
import { Search, Palette, Megaphone, BarChart, Code, Globe, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

// Variants pour les animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0
  }
};

const services = [
  {
    icon: Search,
    title: 'SEO & SEA',
    description: 'Optimisation pour les moteurs de recherche et gestion des campagnes publicitaires pour une visibilité maximale.',
    features: ['Audit SEO', 'Optimisation on-page', 'Stratégie de mots-clés', 'Campagnes Google Ads']
  },
  {
    icon: Code,
    title: 'Développement Web',
    description: 'Création de sites web et applications sur mesure avec les dernières technologies.',
    features: ['Sites responsive', 'E-commerce', 'Applications web', 'Maintenance']
  },
  {
    icon: Palette,
    title: 'Design & UX',
    description: 'Création d\'expériences utilisateur intuitives et de designs modernes qui convertissent.',
    features: ['UI/UX Design', 'Identité visuelle', 'Prototypage', 'Design system']
  },
  {
    icon: Megaphone,
    title: 'Social Media',
    description: 'Gestion de vos réseaux sociaux et création de contenu engageant pour votre communauté.',
    features: ['Stratégie social media', 'Création de contenu', 'Community management', 'Publicités sociales']
  },
  {
    icon: BarChart,
    title: 'Analytics',
    description: 'Analyse de données et reporting détaillé pour optimiser vos performances.',
    features: ['Tableaux de bord', 'Rapports personnalisés', 'Suivi KPIs', 'Recommandations']
  },
  {
    icon: Globe,
    title: 'Stratégie Digitale',
    description: 'Élaboration de stratégies digitales complètes pour atteindre vos objectifs.',
    features: ['Planning digital', 'Benchmark', 'Roadmap', 'Accompagnement']
  }
];

export function Services() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-white relative overflow-hidden" id="services">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-secondary/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.span
            variants={itemVariants}
            className="text-secondary font-semibold mb-4 block"
          >
            NOS SERVICES
          </motion.span>
          <motion.h2
            variants={itemVariants}
            className="text-4xl font-bold text-primary mb-4"
          >
            Solutions digitales complètes
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            De la stratégie à l'exécution, nous vous accompagnons dans tous les aspects de votre présence digitale.
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`relative bg-white rounded-2xl p-8 shadow-lg transition-all duration-300 transform 
                         border border-gray-100 
                         ${hoveredIndex === index ? 'shadow-xl -translate-y-2' : ''}`}
            >
              <div
                className={`absolute inset-0 rounded-2xl transition-opacity 
                            ${hoveredIndex === index ? 'opacity-100 bg-gradient-to-br from-secondary/5 to-accent/5' : 'opacity-0'}`}
              />

              <div className="relative z-10">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-colors 
                              ${hoveredIndex === index ? 'bg-secondary/20' : 'bg-secondary/10'}`}>
                  <service.icon className="w-6 h-6 text-secondary" />
                </div>

                <h3 className="text-xl font-semibold text-primary mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>

                <div className={`absolute top-0 left-0 w-full h-full bg-white rounded-xl flex flex-col items-start p-6 transition-opacity duration-300 ${hoveredIndex === index ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                  {service.features.map((feature, i) => (
                    <div key={i} className="flex items-center text-sm text-gray-600 mb-2">
                      <div className="w-1.5 h-1.5 bg-secondary rounded-full mr-2" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 
                     rounded-full font-semibold hover:bg-primary/90 transition-colors"
          >
            Discuter de votre projet
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default Services;
