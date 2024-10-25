const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

// Connexion à MongoDB
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 60000,  // 60 secondes pour la sélection du serveur
    socketTimeoutMS: 120000,           // 120 secondes pour les sockets inactifs
    connectTimeoutMS: 120000           // 120 secondes pour la connexion initiale
})
.then(() => console.log('Connecté à MongoDB...'))
.catch(err => {
    console.error('Erreur de connexion à MongoDB:', err.message);
});

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

const Article = mongoose.models.Article || mongoose.model('Article', articleSchema, 'articles');

// Route pour générer le sitemap dynamique
app.get('/api/sitemap', async (req, res) => {
    try {
        // Début du sitemap
        let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n`;
        sitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

        // URLs statiques à ajouter
        const staticUrls = [
            {
                loc: 'https://www.tolly.fr/',
                lastmod: new Date().toISOString().split('T')[0], // Date du jour
                changefreq: 'weekly',
                priority: '1.0'
            },
            {
                loc: 'https://www.tolly.fr/blog.html',
                lastmod: new Date().toISOString().split('T')[0],
                changefreq: 'weekly',
                priority: '0.8'
            }
        ];

        staticUrls.forEach(url => {
            sitemap += `  <url>\n`;
            sitemap += `    <loc>${url.loc}</loc>\n`;
            sitemap += `    <lastmod>${url.lastmod}</lastmod>\n`;
            sitemap += `    <changefreq>${url.changefreq}</changefreq>\n`;
            sitemap += `    <priority>${url.priority}</priority>\n`;
            sitemap += `  </url>\n`;
        });

        // Récupérer les articles depuis MongoDB et ajouter leurs URLs
        const articles = await Article.find();
        articles.forEach(article => {
            sitemap += `  <url>\n`;
            sitemap += `    <loc>https://www.tolly.fr/article.html?slug=${article.slug}</loc>\n`;
            sitemap += `    <lastmod>${new Date(article.date).toISOString().split('T')[0]}</lastmod>\n`;
            sitemap += `    <changefreq>weekly</changefreq>\n`;
            sitemap += `    <priority>0.8</priority>\n`;
            sitemap += `  </url>\n`;
        });

        // Fin du sitemap
        sitemap += `</urlset>\n`;

        // Envoyer le sitemap
        res.header('Content-Type', 'application/xml');
        res.send(sitemap);
    } catch (error) {
        console.error('Erreur lors de la génération du sitemap:', error);
        res.status(500).send('Erreur lors de la génération du sitemap.');
    }
});

module.exports = app;
