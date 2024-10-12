const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
app.use(express.json());

// Chemin vers le fichier JSON des articles
const articlesFilePath = path.join(__dirname, './articles.json');

// Fonction pour lire les articles
function readArticles() {
    if (fs.existsSync(articlesFilePath)) {
        return JSON.parse(fs.readFileSync(articlesFilePath, 'utf-8')); // Ajout de 'utf-8'
    }
    return [];
}

// Fonction pour écrire les articles
function writeArticles(articles) {
    fs.writeFileSync(articlesFilePath, JSON.stringify(articles, null, 2), 'utf-8'); // Ajout de 'utf-8'
}

// Route pour récupérer tous les articles
app.get('/api/articles', (req, res) => {
    const articles = readArticles();
    res.json(articles);
});

// Route pour récupérer un article par ID
app.get('/api/articles/:id', (req, res) => {
    const articles = readArticles();
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
    console.log('Données reçues :', req.body); // Log des données reçues

    // Vérifie que tous les champs requis sont présents
    if (!title || !metaDescription || !content || !imageUrl) {
        console.error('Champs manquants dans la requête');
        return res.status(400).json({ error: 'Champs manquants' });
    }

    // Générer le slug SEO-friendly s'il n'est pas fourni
    const slug = url || title.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

    const newArticle = {
        id: Date.now().toString(),
        title,
        slug, // URL SEO-friendly
        metaDescription,
        imageUrl,
        content,
        date: new Date().toISOString(),
        author: 'WeAreWe Team' // Auteur par défaut
    };

    try {
        const articles = readArticles();
        articles.push(newArticle);
        writeArticles(articles);
        res.status(201).json(newArticle);
    } catch (error) {
        console.error('Erreur lors de l\'écriture dans le fichier articles.json :', error);
        res.status(500).json({ error: 'Erreur lors de la création de l\'article' });
    }
});

// Route pour mettre à jour un article existant
app.put('/api/articles/:id', (req, res) => {
    const { title, url, metaDescription, imageUrl, content } = req.body;
    const articles = readArticles();
    const index = articles.findIndex(a => a.id === req.params.id);

    if (index !== -1) {
        // Mettre à jour l'article
        articles[index] = {
            ...articles[index],
            title,
            slug: url || title.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, ''),
            metaDescription,
            imageUrl,
            content
        };
        writeArticles(articles);
        res.json(articles[index]);
    } else {
        res.status(404).send('Article non trouvé');
    }
});

// Route pour supprimer un article
app.delete('/api/articles/:id', (req, res) => {
    let articles = readArticles();
    const initialLength = articles.length;
    articles = articles.filter(a => a.id !== req.params.id);

    if (articles.length !== initialLength) {
        writeArticles(articles);
        res.status(204).send();
    } else {
        res.status(404).send('Article non trouvé');
    }
});

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
