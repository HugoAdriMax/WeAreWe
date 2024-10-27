"use client";

import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sophie Martin",
    role: "PDG",
    company: "TechSolutions",
    content: "Tolly a complètement transformé notre présence en ligne. Leur approche stratégique et créative a généré des résultats exceptionnels. Nos ventes ont augmenté de 200% en seulement 6 mois !",
    rating: 5
  },
  {
    id: 2,
    name: "Thomas Dubois",
    role: "Fondateur",
    company: "EcoStyle",
    content: "Leur expertise en SEO est incroyable. Nous sommes maintenant en première page pour tous nos mots-clés cibles. L'équipe est professionnelle, réactive et toujours à l'écoute de nos besoins.",
    rating: 5
  },
  {
    id: 3,
    name: "Marie Lefevre",
    role: "Directrice Marketing",
    company: "FashionNova",
    content: "La créativité et l'efficacité de leurs campagnes sur les réseaux sociaux ont dépassé toutes nos attentes. Un vrai partenariat gagnant qui continue de porter ses fruits !",
    rating: 5
  }
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* En-tête */}
        <div className="text-center mb-16">
          <span className="text-secondary font-semibold mb-4 block">
            TÉMOIGNAGES
          </span>
          <h2 className="text-4xl font-bold text-primary mb-4">
            Ils nous font confiance
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez ce que nos clients disent de notre collaboration
          </p>
        </div>

        {/* Slider */}
        <div className="relative max-w-4xl mx-auto">
          {/* Carte de témoignage */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <Quote className="text-secondary/10 w-16 h-16 mb-6 mx-auto" />
            
            <div className="text-center">
              {/* Étoiles */}
              <div className="flex justify-center mb-6">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star 
                    key={i} 
                    className="w-5 h-5 text-yellow-400 fill-current" 
                  />
                ))}
              </div>

              {/* Contenu */}
              <p className="text-gray-600 text-lg mb-8 italic">
                "{testimonials[currentIndex].content}"
              </p>

              {/* Informations */}
              <div>
                <h4 className="text-xl font-semibold text-primary mb-2">
                  {testimonials[currentIndex].name}
                </h4>
                <p className="text-gray-500">
                  {testimonials[currentIndex].role} - {testimonials[currentIndex].company}
                </p>
              </div>
            </div>
          </div>

          {/* Boutons de navigation */}
          <div className="flex justify-between items-center mt-8">
            <button
              onClick={goToPrevious}
              className="bg-white p-3 rounded-full shadow-lg hover:bg-gray-50 
                       transition-colors"
              aria-label="Témoignage précédent"
            >
              <ChevronLeft className="w-6 h-6 text-primary" />
            </button>

            {/* Indicateurs */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 
                             ${index === currentIndex 
                               ? 'w-8 bg-primary' 
                               : 'w-2 bg-gray-300'}`}
                  aria-label={`Aller au témoignage ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={goToNext}
              className="bg-white p-3 rounded-full shadow-lg hover:bg-gray-50 
                       transition-colors"
              aria-label="Témoignage suivant"
            >
              <ChevronRight className="w-6 h-6 text-primary" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;