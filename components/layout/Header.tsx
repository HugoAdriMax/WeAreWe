"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { href: '#accueil', label: 'Accueil' },
    { href: '#services', label: 'Services' },
    { href: '#about', label: 'À propos' },
    { href: '#portfolio', label: 'Portfolio' },
    { href: '#testimonials', label: 'Témoignages' },
    { href: '/blog', label: 'Blog' },
  ];

  return (
    <header className="fixed w-full z-30 top-0" style={{ backgroundColor: '#2E5751' }}>
      <div className="container mx-auto py-5 flex items-center justify-between px-4">
        <Link href="/" className="flex items-center hover:opacity-75 transition">
          <Image
            src="https://i.imgur.com/dlkbDqP.png"
            alt="Logo Tolly"
            width={40}
            height={40}
            className="h-10 w-auto"
            priority
          />
        </Link>

        {/* Navigation desktop */}
        <nav className="hidden md:flex space-x-10 items-center">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-white hover:text-[#FBD3C6] transition-colors duration-200"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="#contact"
            className="bg-[#023e35] text-white px-4 py-2 rounded-md font-semibold 
                     hover:bg-[#FBD3C6] hover:text-[#023e35] transition-colors duration-200"
          >
            Contact
          </Link>
        </nav>

        {/* Bouton menu mobile */}
        <button
          className="md:hidden rounded-lg focus:outline-none focus:shadow-outline text-white"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <svg fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6">
            <path
              className={!isOpen ? "block" : "hidden"}
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
            />
            <path
              className={isOpen ? "block" : "hidden"}
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            />
          </svg>
        </button>
      </div>

      {/* Menu mobile */}
      <nav
        className={`${
          isOpen ? 'block' : 'hidden'
        } md:hidden bg-white shadow-lg`}
      >
        {menuItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="block py-2 px-4 text-gray-800 hover:bg-[#2E5751] hover:text-white 
                     transition-colors duration-200"
            onClick={() => setIsOpen(false)}
          >
            {item.label}
          </Link>
        ))}
        <Link
          href="#contact"
          className="block py-2 px-4 text-gray-800 hover:bg-[#2E5751] hover:text-white 
                   transition-colors duration-200"
          onClick={() => setIsOpen(false)}
        >
          Contact
        </Link>
      </nav>
    </header>
  );
};

export default Header;