"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { 
  Target, 
  Lightbulb,
  Users, 
  Rocket,
  CheckCircle2
} from 'lucide-react';

const stats = [
  { value: '10+', label: "Années d'expérience" },
  { value: '150+', label: 'Projets réalisés' },
  { value: '50+', label: 'Clients actifs' },
  { value: '95%', label: 'Satisfaction client' }
];

const values = [
  {
    icon: Target,
    title: 'Excellence',
    description: 'Nous visons lexcellence dans chaque projet, en dépassant les attentes.'
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'Nous restons à la pointe des dernières technologies et tendances.'
  },
  {
    icon: Users,
    title: 'Collaboration',
    description: 'Nous travaillons en étroite collaboration avec nos clients pour assurer leur succès.'
  },
  {
    icon: Rocket,
    title: 'Performance',
    description: 'Nous nous engageons à délivrer des résultats mesurables et impactants.'
  }
];

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section id="about" className="py-24 bg-white overflow-hidden" ref={containerRef}>
      <div className="container mx-auto px-4">
        {/* En-tête */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-secondary font-semibold mb-4 block"
          >
            À PROPOS DE NOUS
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold text-primary mb-6"
          >
            Une agence digitale engagée dans votre réussite
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-600"
          >
            Depuis plus de 10 ans, nous accompagnons les entreprises dans leur transformation digitale 
            avec passion et expertise.
          </motion.p>
        </div>

        {/* Grille principale */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
{/* Image avec effet parallaxe */}
<motion.div 
  className="relative w-full"
  style={{ y, opacity }}
>
  <div className="relative w-full h-[300px] md:h-[400px] lg:h-[600px] rounded-2xl overflow-hidden">
    <Image
      src="/images/projects/about2.png"
      alt="Notre équipe"
      fill
      className="object-cover"
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
      priority
      quality={100}
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 lg:p-8 text-white">
      <h3 className="text-xl md:text-2xl font-bold mb-1 md:mb-2">Notre équipe</h3>
      <p className="text-sm md:text-base">Des experts passionnés à votre service</p>
    </div>
  </div>
</motion.div>

          {/* Contenu */}
          <div className="space-y-8">
            <motion.h3
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-primary mb-6"
            >
              Votre succès, notre priorité
            </motion.h3>

            <div className="space-y-6">
              <p className="text-gray-600">
                Chez Tolly, nous croyons que chaque entreprise mérite une présence digitale 
                exceptionnelle. Notre approche combine créativité, technologie et stratégie 
                pour délivrer des résultats qui dépassent les attentes.
              </p>

              <div className="space-y-4">
                {['Expertise technique approfondie', 
                  'Approche sur-mesure', 
                  'Support réactif', 
                  'Résultats mesurables'].map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2 className="text-secondary w-5 h-5 flex-shrink-0" />
                    <span className="text-gray-600">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-6 rounded-2xl bg-gray-50"
            >
              <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Nos valeurs */}
        <div>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-primary text-center mb-12"
          >
            Nos valeurs
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-gray-50 text-center"
              >
                <div className="w-16 h-16 bg-secondary/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-secondary" />
                </div>
                <h4 className="text-xl font-semibold text-primary mb-3">{value.title}</h4>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-secondary text-white px-8 py-4 
                     rounded-full font-semibold hover:bg-secondary/90 transition-colors"
          >
            Démarrer votre projet
            <Rocket className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default About;