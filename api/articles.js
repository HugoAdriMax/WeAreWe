const express = require('express');
const mongoose = require('mongoose');
const redis = require('redis');
const axios = require('axios');
const sharp = require('sharp');

const app = express();
app.use(express.json());

// Utilisez la variable d'environnement pour l'URI de connexion à votre base de données MongoDB
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, {
    serverSelectionTimeoutMS: 30000,
    socketTimeoutMS: 45000,
    connectTimeoutMS: 30000
})
.then(() => console.log('Connecté à MongoDB...'))
.catch(err => {
    console.error('Erreur de connexion à MongoDB:', err.message);
    if (err.name === 'MongoNetworkError') {
        console.error('Problème réseau ou de configuration. Vérifiez l\'accès réseau.');
    }
});

// Créer un client Redis avec l'URL TLS fournie par Upstash
const redisClient = redis.createClient({
    url: process.env.REDIS_TLS_URL
});

redisClient.on('error', (err) => console.error('Erreur Redis', err));

// Connexion à Redis
(async () => {
    try {
        await redisClient.connect();
        console.log('Connecté à Redis via Upstash');
    } catch (error) {
        console.error('Erreur de connexion à Redis:', error);
    }
})();

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

// Vérifie si le modèle 'Article' existe déjà avant de le définir
const Article = mongoose.models.Article || mongoose.model('Article', articleSchema, 'articles');

// Fonction pour mettre les articles en cache
async function cacheArticles(key, value) {
    try {
        await redisClient.set(key, JSON.stringify(value), {
            EX: 60 // Expire dans 60 secondes
        });
    } catch (error) {
        console.error('Erreur lors de la mise en cache:', error);
    }
}

// Fonction pour récupérer les articles depuis le cache
async function getCachedArticles(key) {
    try {
        const data = await redisClient.get(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Erreur lors de la récupération des données du cache:', error);
        return null;
    }
}

// Route pour récupérer tous les articles
app.get('/api/articles', async (req, res) => {
    try {
        // Récupérez les articles depuis le cache
        const cachedArticles = await getCachedArticles('articles');

        if (cachedArticles) {
            console.log('Données récupérées du cache');
            return res.json(cachedArticles);
        }

        // Si les articles ne sont pas dans le cache, interrogez la base de données
        const articles = await Article.find().sort({ date: -1 });

        // Mettez les articles en cache
        await cacheArticles('articles', articles);

        console.log('Données récupérées de MongoDB et mises en cache');
        res.json(articles);
    } catch (error) {
        console.error('Erreur lors de la récupération des articles:', error);
        res.status(500).json({ error: 'Erreur lors de la récupération des articles' });
    }
});

// Route pour servir les images optimisées
app.get('/images-optimized', async (req, res) => {
    try {
        const imageUrl = req.query.url;
        if (!imageUrl) {
            return res.status(400).send('URL de l\'image manquante');
        }

        // Récupérer l'image depuis l'URL
        const response = await axios({
            url: imageUrl,
            method: 'GET',
            responseType: 'arraybuffer'
        });

        const buffer = Buffer.from(response.data);

        // Vérifier le format supporté par le client
        const accept = req.headers.accept;
        let format = 'png'; // Par défaut

        if (accept.includes('image/webp')) {
            format = 'webp';
        } else if (accept.includes('image/avif')) {
            format = 'avif';
        }

        // Convertir l'image avec sharp
        const optimizedImage = await sharp(buffer)
            .toFormat(format, { quality: 80 }) // Qualité ajustable
            .toBuffer();

        // Définir l'en-tête Content-Type selon le format
        res.set('Content-Type', `image/${format}`);
        res.send(optimizedImage);
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'image :', error);
        res.status(500).send('Erreur serveur');
    }
});

// Route pour créer un nouvel article
app.post('/api/articles', async (req, res) => {
    const { title, url, metaDescription, imageUrl, content } = req.body;

    if (!title || !metaDescription || !content || !imageUrl) {
        return res.status(400).json({ error: 'Champs manquants' });
    }

    const slug = url || title.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

    const newArticle = new Article({
        title,
        slug,
        metaDescription,
        imageUrl,
        content,
        author: 'WeAreWe Team'
    });

    try {
        const savedArticle = await newArticle.save();

        // Invalider le cache
        await redisClient.del('articles');

        res.status(201).json(savedArticle);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la création de l\'article' });
    }
});

// Autres routes (update, delete...) restent inchangées.

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
