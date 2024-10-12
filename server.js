const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); // Autoriser les requêtes CORS
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Chemin du fichier JSON pour stocker les articles
const articlesFilePath = path.join(__dirname, 'articles.json');

// Fonction pour lire les articles
function readArticles() {
    if (fs.existsSync(articlesFilePath)) {
        return JSON.parse(fs.readFileSync(articlesFilePath));
    }
    return [];
}

// Fonction pour écrire les articles
function writeArticles(articles) {
    fs.writeFileSync(articlesFilePath, JSON.stringify(articles, null, 2));
}

// Route pour récupérer tous les articles
app.get('/api/articles', (req, res) => {
    const articles = readArticles();
    res.json(articles);
});

// Route pour récupérer un article spécifique
app.get('/api/articles/:slug', (req, res) => {
    const articles = readArticles();
    const article = articles.find(a => a.title.toLowerCase().replace(/\s+/g, '-') === req.params.slug);
    if (article) {
        res.json(article);
    } else {
        res.status(404).json({ message: 'Article non trouvé' });
    }
});

// Route pour ajouter un nouvel article
app.post('/api/articles', (req, res) => {
    const { title, author, content, coverImage } = req.body;
    const articles = readArticles();
    const newArticle = { title, author, content, coverImage: coverImage || '', date: new Date().toLocaleDateString() };
    articles.push(newArticle);
    writeArticles(articles);
    res.status(201).json({ message: 'Article ajouté avec succès', article: newArticle });
});

// Route pour modifier un article
app.put('/api/articles/:slug', (req, res) => {
    const { title, author, content, coverImage } = req.body;
    const articles = readArticles();
    const articleIndex = articles.findIndex(a => a.title.toLowerCase().replace(/\s+/g, '-') === req.params.slug);

    if (articleIndex !== -1) {
        articles[articleIndex] = { title, author, content, coverImage, date: new Date().toLocaleDateString() };
        writeArticles(articles);
        res.json({ message: 'Article modifié avec succès', article: articles[articleIndex] });
    } else {
        res.status(404).json({ message: 'Article non trouvé' });
    }
});

// Route pour supprimer un article
app.delete('/api/articles/:slug', (req, res) => {
    const articles = readArticles();
    const newArticles = articles.filter(a => a.title.toLowerCase().replace(/\s+/g, '-') !== req.params.slug);
    if (newArticles.length !== articles.length) {
        writeArticles(newArticles);
        res.json({ message: 'Article supprimé avec succès' });
    } else {
        res.status(404).json({ message: 'Article non trouvé' });
    }
});

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
