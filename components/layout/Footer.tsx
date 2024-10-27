"use client";

import Link from 'next/link';
import { Mail, Instagram } from 'lucide-react';
import { useState } from 'react';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const currentYear = new Date().getFullYear();

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Ici, ajoutez votre logique pour gérer l'inscription à la newsletter
    console.log('Email souscrit:', email);
    setEmail('');
  };

  const quickLinks = [
    { href: '#home', label: 'Accueil' },
    { href: '#services', label: 'Services' },
    { href: '#about', label: 'À propos' },
    { href: '#portfolio', label: 'Portfolio' },
    { href: '#contact', label: 'Contact' }
  ];

  const services = [
    'SEO & SEA',
    'Web Design & UX',
    'Social Media Marketing',
    'Content Marketing',
    'Analyse de données'
  ];

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Section À propos */}
          <div>
            <h3 className="text-2xl font-semibold mb-4">Tolly</h3>
            <p className="mb-4 text-gray-400">
              Votre partenaire pour une présence en ligne exceptionnelle.
            </p>
            <p className="text-gray-400">
              &copy; {currentYear} Tolly. Tous droits réservés.
            </p>
          </div>

          {/* Section Liens rapides */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Liens rapides</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-secondary transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Section Services */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service}>
                  <Link
                    href="#services"
                    className="text-gray-400 hover:text-secondary transition-colors duration-200"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Section Newsletter */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Newsletter</h4>
            <p className="mb-4 text-gray-400">
              Restez informé des dernières tendances en marketing digital.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-4">
              <div className="flex flex-col space-y-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Votre email"
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white 
                           focus:outline-none focus:ring-2 focus:ring-secondary"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-secondary text-primary px-4 py-2 rounded-lg 
                           font-semibold hover:bg-accent transition-colors duration-200"
                >
                  S'abonner
                </button>
              </div>
            </form>

            {/* Contact et Réseaux sociaux */}
            <div className="mt-6 space-y-4">
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-secondary" />
                <a
                  href="mailto:contact@tolly.fr"
                  className="text-gray-400 hover:text-secondary transition-colors duration-200"
                >
                  contact@tolly.fr
                </a>
              </div>
              <div className="flex space-x-4">
                <a
                  href="https://www.instagram.com/wearewework/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-secondary transition-colors duration-200"
                >
                  <Instagram className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Barre de séparation */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            Site web développé avec ❤️ par{' '}
            <a
              href="mailto:contact@tolly.fr"
              className="text-secondary hover:text-accent transition-colors duration-200"
            >
              Tolly
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;