"use client";

import { motion } from 'framer-motion';

interface AnimatedTitleProps {
  children: React.ReactNode;
  className?: string;
}

export const AnimatedTitle = ({ children, className = "" }: AnimatedTitleProps) => {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={className}
    >
      {children}
    </motion.h2>
  );
};