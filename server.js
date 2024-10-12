const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
app.use(express.json());

// Stockage en mémoire des articles
let articles = [];

// Chemin vers le fichier JSON des articles
const articlesFilePath = path.join(__dirname, './articles.json');

// Charger les articles depuis le fichier JSON lors du démarrage
if (fs.existsSync(articlesFilePath)) {
    try {
        articles = JSON.parse(fs.readFileSync(articlesFilePath, 'utf8'));
        console.log("Articles chargés depuis le fichier JSON.");
    } catch (err) {
        console.error('Erreur lors du chargement des articles :', err);
    }
}

// Fonction pour sauvegarder les articles dans le fichier JSON
function saveArticlesToFile() {
    try {
        fs.writeFileSync(articlesFilePath, JSON.stringify(articles, null, 2));
        console.log('Articles sauvegardés dans le fichier JSON.');
    } catch (err) {
        console.error('Erreur lors de la sauvegarde des articles :', err);
    }
}

// Route pour récupérer tous les articles
app.get('/api/articles', (req, res) => {
    res.json(articles);
});

// Route pour récupérer un article par ID
app.get('/api/articles/:id', (req, res) => {
    const article = articles.find(a => a.id === req.params.id);
    if (article) {
        res.json(article);
    } else {
        res.status(404).send('Article non trouvé');
    }
});

// Route pour créer un nouvel article
app.post('/api/articles', (req, res) => {
    const { title, url, metaDescription, imageUrl, content } = req.body;
    console.log('Données reçues :', req.body);

    if (!title || !metaDescription || !content || !imageUrl) {
        return res.status(400).json({ error: 'Champs manquants' });
    }

    const slug = url || title.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

    const newArticle = {
        id: Date.now().toString(),
        title,
        slug,
        metaDescription,
        imageUrl,
        content,
        date: new Date().toISOString(),
        author: 'WeAreWe Team'
    };

    articles.push(newArticle);
    saveArticlesToFile();
    res.status(201).json(newArticle);
});

// Route pour mettre à jour un article existant
app.put('/api/articles/:id', (req, res) => {
    const { title, url, metaDescription, imageUrl, content } = req.body;
    const index = articles.findIndex(a => a.id === req.params.id);

    if (index !== -1) {
        articles[index] = {
            ...articles[index],
            title,
            slug: url || title.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, ''),
            metaDescription,
            imageUrl,
            content
        };
        saveArticlesToFile();
        res.json(articles[index]);
    } else {
        res.status(404).send('Article non trouvé');
    }
});

// Route pour supprimer un article
app.delete('/api/articles/:id', (req, res) => {
    const { id } = req.params;
    const initialLength = articles.length;
    articles = articles.filter(a => a.id !== id);

    if (articles.length !== initialLength) {
        saveArticlesToFile();
        res.status(204).send(); // Renvoie un 204 sans contenu
    } else {
        res.status(404).json({ error: 'Article non trouvé' });
    }
});

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
