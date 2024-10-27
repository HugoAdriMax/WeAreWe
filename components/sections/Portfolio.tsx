"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ExternalLink, ChevronRight } from 'lucide-react';
import Image from 'next/image';

// Types
interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  tags: string[];
  image: string;
}

interface Category {
  id: string;
  label: string;
}

// Données
const categories: Category[] = [
  { id: 'all', label: 'Tous' },
  { id: 'web', label: 'Sites Web' },
  { id: 'ecommerce', label: 'E-commerce' },
  { id: 'marketing', label: 'Marketing' },
  { id: 'branding', label: 'Branding' }
];

const projects: Project[] = [
  {
    id: 1,
    title: "BoutiqueChic",
    category: "ecommerce",
    description: "Plateforme e-commerce de luxe avec une expérience d'achat personnalisée",
    tags: ["Shopify", "UI/UX", "SEO"],
    image: "/images/projects/1.jpg"
  },
  {
    id: 2,
    title: "TechInnovate",
    category: "web",
    description: "Site vitrine moderne pour une entreprise de technologie",
    tags: ["React", "Next.js", "Animation"],
    image: "/images/projects/2.jpg"
  },
  {
    id: 3,
    title: "FoodieParadise",
    category: "marketing",
    description: "Campagne marketing digitale pour une chaîne de restaurants",
    tags: ["Social Media", "Ads", "Content"],
    image: "/images/projects/3.jpg"
  },
  {
    id: 4,
    title: "EcoStyle",
    category: "branding",
    description: "Refonte complète de l'identité visuelle d'une marque éco-responsable",
    tags: ["Branding", "Design", "Print"],
    image: "/images/projects/4.jpg"
  },
  {
    id: 5,
    title: "SportFlex",
    category: "ecommerce",
    description: "Marketplace d'équipements sportifs avec système de réservation",
    tags: ["E-commerce", "Booking", "Mobile"],
    image: "/images/projects/5.jpg"
  },
  {
    id: 6,
    title: "ArtGallery",
    category: "web",
    description: "Galerie d'art virtuelle avec expérience 3D",
    tags: ["3D", "WebGL", "Interactive"],
    image: "/images/projects/6.jpg"
  }
].map(project => ({
  ...project,
}));

export function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [imageError, setImageError] = useState<Record<number, boolean>>({});

  const filteredProjects = projects.filter(project => 
    activeCategory === 'all' || project.category === activeCategory
  );

  return (
    <section id="portfolio" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-secondary font-semibold mb-4 block">
            NOS RÉALISATIONS
          </span>
          <h2 className="text-4xl font-bold text-primary mb-4">
            Découvrez nos projets
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Des solutions digitales sur mesure qui répondent aux besoins spécifiques de nos clients
          </p>
        </div>

        {/* Filtres */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all
                ${activeCategory === category.id 
                  ? 'bg-primary text-white' 
                  : 'bg-white text-gray-600 hover:bg-gray-100'}`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Projets */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="wait">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-lg"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className="relative h-64">
                  {!imageError[project.id] ? (
                    <>
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        onError={() => {
                          setImageError(prev => ({ ...prev, [project.id]: true }));
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    </>
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                      <span className="text-6xl font-bold text-white/10">
                        {project.title[0]}
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-primary mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs px-3 py-1 bg-gray-100 text-gray-600 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    className="inline-flex items-center text-primary hover:text-secondary transition-colors"
                  >
                    Voir le projet
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>

                {/* Overlay au survol */}
                <div 
                  className={`absolute inset-0 bg-primary/90 flex items-center justify-center 
                             transition-opacity duration-300 ${
                               hoveredProject === project.id 
                                 ? 'opacity-100' 
                                 : 'opacity-0 pointer-events-none'
                             }`}
                >
                  <div className="text-center text-white p-6">
                    <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                    <p className="mb-6">{project.description}</p>
                    <button
                      className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary 
                               rounded-full hover:bg-secondary transition-colors"
                    >
                      Voir le détail
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

export default Portfolio;