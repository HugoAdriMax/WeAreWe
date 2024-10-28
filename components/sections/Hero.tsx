"use client";

import { motion } from 'framer-motion';
import { ArrowRight, MousePointer2 } from 'lucide-react';
import Link from 'next/link';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-b from-primary to-[#1a3731] overflow-hidden">
      {/* Cercles décoratifs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[20%] right-[10%] w-72 h-72 bg-secondary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[20%] left-[10%] w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      {/* Contenu principal */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <span className="bg-white/10 text-white px-4 py-2 rounded-full text-sm font-medium inline-block mb-6">
              Agence Marketing Digital
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Propulsez votre présence digitale vers de 
              <span className="text-secondary"> nouveaux sommets</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Nous combinons stratégie, créativité et technologie pour transformer 
              votre vision en résultats concrets.
            </p>
          </motion.div>

          <motion.div 
            className="flex flex-col sm:flex-row justify-center items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="#contact"
              className="bg-secondary text-white px-8 py-4 rounded-full font-semibold 
                       flex items-center gap-2 hover:bg-accent transition-all duration-300 
                       transform hover:-translate-y-1 hover:shadow-lg group w-full sm:w-auto 
                       justify-center"
            >
              Démarrer un projet
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="#services"
              className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full 
                       font-semibold hover:bg-white/20 transition-all duration-300 
                       transform hover:-translate-y-1 w-full sm:w-auto justify-center
                       flex items-center gap-2"
            >
              Découvrir nos services
              <MousePointer2 className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <div className="w-8 h-12 rounded-full border-2 border-white/20 flex items-center justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}

export default Hero;