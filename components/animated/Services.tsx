"use client";

import { AnimatedTitle } from '@/components/animated/AnimatedTitle';
import { Search, Palette, Megaphone } from 'lucide-react';
import { motion } from 'framer-motion';

const services = [
  {
    icon: Search,
    title: 'SEO & SEA',
    description: 'Optimisez votre visibilité sur les moteurs de recherche et attirez un trafic qualifié vers votre site web.'
  },
  {
    icon: Palette,
    title: 'Web Design & UX',
    description: 'Créez une expérience utilisateur exceptionnelle avec des designs modernes et intuitifs qui convertissent.'
  },
  {
    icon: Megaphone,
    title: 'Social Media Marketing',
    description: 'Engagez votre audience sur les réseaux sociaux et construisez une communauté fidèle autour de votre marque.'
  }
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6
    }
  }
};

export const Services = () => {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <AnimatedTitle className="text-4xl font-bold mb-12 text-center text-primary">
          Nos services
        </AnimatedTitle>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-4xl mb-4 text-primary">
                <service.icon size={40} />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-primary">
                {service.title}
              </h3>
              <p className="bg-secondary text-primary p-4 rounded-lg">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};