const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// Schéma pour les articles
const articleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    metaDescription: { type: String, required: true },
    imageUrl: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: Date, default: Date.now },
    author: { type: String, default: 'WeAreWe Team' }
});

// Modèle pour les articles
const Article = mongoose.models.Article || mongoose.model('Article', articleSchema, 'articles');

// Route pour générer le sitemap dynamique
app.get('/api/sitemap', async (req, res) => {
    try {
        const articles = await Article.find();
        let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n`;
        sitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

        articles.forEach(article => {
            sitemap += `  <url>\n`;
            sitemap += `    <loc>https://www.wearewework.com/article.html?slug=${article.slug}</loc>\n`;
            sitemap += `    <lastmod>${new Date(article.date).toISOString().split('T')[0]}</lastmod>\n`;
            sitemap += `    <changefreq>weekly</changefreq>\n`;
            sitemap += `    <priority>0.8</priority>\n`;
            sitemap += `  </url>\n`;
        });

        sitemap += `</urlset>`;
        res.header('Content-Type', 'application/xml');
        res.send(sitemap);
    } catch (error) {
        console.error('Erreur lors de la génération du sitemap:', error);
        res.status(500).send('Erreur lors de la génération du sitemap.');
    }
});

// Exporter le module pour que Vercel puisse l'exécuter
module.exports = app;