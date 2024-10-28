import { NextResponse } from 'next/server';
import dbConnect from '@/app/lib/mongodb';  // Chemin complet depuis la racine
import { Article } from '@/app/models/Article';  // Chemin complet depuis la racine

export async function GET() {
  try {
    await dbConnect();
    const articles = await Article.find();

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.tolly.fr/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://www.tolly.fr/blog</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  ${articles.map(article => `
  <url>
    <loc>https://www.tolly.fr/article/${article.slug}</loc>
    <lastmod>${new Date(article.date).toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  `).join('')}
</urlset>`;

    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=86400, stale-while-revalidate=3600' // Cache 24h, revalidation toutes les heures
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la génération du sitemap' },
      { status: 500 }
    );
  }
}
