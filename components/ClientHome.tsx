"use client";

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Dynamic imports
const Hero = dynamic(() => import('@/components/sections/Hero').then(mod => mod.Hero), {
  ssr: false
});
const Services = dynamic(() => import('@/components/sections/Services').then(mod => mod.Services), {
  ssr: false
});
const About = dynamic(() => import('@/components/sections/About').then(mod => mod.About), {
  ssr: false
});
const Portfolio = dynamic(() => import('@/components/sections/Portfolio').then(mod => mod.Portfolio), {
  ssr: false
});
const Testimonials = dynamic(() => import('@/components/sections/Testimonials').then(mod => mod.Testimonials), {
  ssr: false
});
const Contact = dynamic(() => import('@/components/sections/Contact').then(mod => mod.Contact), {
  ssr: false
});

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
  </div>
);

export function ClientHome() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Hero />
      <Services />
      <About />
      <Portfolio />
      <Testimonials />
      <Contact />
    </Suspense>
  );
}