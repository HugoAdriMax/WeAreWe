const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// Remplacez 'your_mongo_db_uri' par l'URI de connexion à votre base de données
const mongoURI = process.env.MONGO_URI; // Utilisez la variable d'environnement
mongoose.connect(mongoURI)
    .then(() => console.log('Connecté à MongoDB...'))
    .catch(err => console.error('Erreur de connexion à MongoDB', err));

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
const Article = mongoose.model('Article', articleSchema);

// Route pour récupérer tous les articles
app.get('/api/articles', async (req, res) => {
    try {
        const articles = await Article.find();
        res.json(articles);
    } catch (error) {
        console.error('Erreur lors de la récupération des articles:', error);
        res.status(500).json({ error: 'Erreur lors de la récupération des articles' });
    }
});

// Route pour récupérer un article par ID
app.get('/api/articles/:id', async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (article) {
            res.json(article);
        } else {
            res.status(404).send('Article non trouvé');
        }
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'article:', error);
        res.status(500).send('Erreur lors de la récupération de l\'article');
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
        res.status(201).json(savedArticle);
    } catch (error) {
        console.error('Erreur lors de la création de l\'article:', error);
        res.status(500).json({ error: 'Erreur lors de la création de l\'article' });
    }
});

// Route pour mettre à jour un article existant
app.put('/api/articles/:id', async (req, res) => {
    const { title, url, metaDescription, imageUrl, content } = req.body;
    const slug = url || title.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

    try {
        const article = await Article.findByIdAndUpdate(req.params.id, {
            title,
            slug,
            metaDescription,
            imageUrl,
            content
        }, { new: true });

        if (article) {
            res.json(article);
        } else {
            res.status(404).send('Article non trouvé');
        }
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'article:', error);
        res.status(500).send('Erreur lors de la mise à jour de l\'article');
    }
});

// Route pour supprimer un article
app.delete('/api/articles/:id', async (req, res) => {
    try {
        const result = await Article.findByIdAndDelete(req.params.id);
        if (result) {
            res.status(204).send(); // Suppression réussie
        } else {
            res.status(404).json({ error: 'Article non trouvé' });
        }
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'article:', error);
        res.status(500).json({ error: 'Erreur lors de la suppression de l\'article' });
    }
});

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
