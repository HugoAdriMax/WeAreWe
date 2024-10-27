"use client";

import { useSession } from 'next-auth/react';

export default function CMSLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Ajouter un espace pour compenser le header fixe */}
      <div className="pt-20">
        {children}
      </div>
    </div>
  );
}