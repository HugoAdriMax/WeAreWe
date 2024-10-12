const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid'); // Utilisé pour générer des identifiants uniques

const app = express();
const PORT = 3000;

// Middleware pour parser le corps des requêtes JSON
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Chemin du fichier JSON pour stocker les articles (articles.json)
const articlesFilePath = path.join(__dirname, 'articles.json');

// Fonction pour lire les articles avec gestion des erreurs
function readArticles() {
    try {
        if (fs.existsSync(articlesFilePath)) {
            return JSON.parse(fs.readFileSync(articlesFilePath, 'utf-8'));
        }
        return [];
    } catch (error) {
        console.error('Erreur lors de la lecture des articles :', error);
        return [];
    }
}

// Fonction pour écrire les articles avec gestion des erreurs
function writeArticles(articles) {
    try {
        fs.writeFileSync(articlesFilePath, JSON.stringify(articles, null, 2));
    } catch (error) {
        console.error('Erreur lors de l\'écriture des articles :', error);
    }
}

// Route pour récupérer tous les articles
app.get('https://www.wearewework.com/api/articles', (req, res) => {
    const articles = readArticles();
    res.json(articles);
});

// Route pour récupérer un article spécifique par son id
app.get('https://www.wearewework.com/api/articles/:id', (req, res) => {
    const articles = readArticles();
    const article = articles.find(a => a.id === req.params.id);
    if (article) {
        res.json(article);
    } else {
        res.status(404).json({ message: 'Article non trouvé' });
    }
});

// Route pour ajouter un nouvel article avec validation
app.post('https://www.wearewework.com/api/articles', (req, res) => {
    const { title, author, content, coverImage } = req.body;

    // Validation des champs
    if (!title || !author || !content) {
        return res.status(400).json({ message: 'Tous les champs requis ne sont pas remplis' });
    }

    const articles = readArticles();
    const newArticle = {
        id: uuidv4(), // Génère un identifiant unique
        title,
        author,
        content,
        coverImage: coverImage || '',
        date: new Date().toLocaleDateString() // Ajoute la date du jour
    };

    articles.push(newArticle);
    writeArticles(articles);
    res.status(201).json({ message: 'Article ajouté avec succès', article: newArticle });
});

// Route pour modifier un article par son id avec validation
app.put('https://www.wearewework.com/api/articles/:id', (req, res) => {
    const { title, author, content, coverImage } = req.body;

    // Validation des champs
    if (!title || !author || !content) {
        return res.status(400).json({ message: 'Tous les champs requis ne sont pas remplis' });
    }

    const articles = readArticles();
    const articleIndex = articles.findIndex(a => a.id === req.params.id);

    if (articleIndex !== -1) {
        articles[articleIndex] = {
            id: req.params.id,
            title,
            author,
            content,
            coverImage: coverImage || '',
            date: new Date().toLocaleDateString()
        };
        writeArticles(articles);
        res.json({ message: 'Article modifié avec succès', article: articles[articleIndex] });
    } else {
        res.status(404).json({ message: 'Article non trouvé' });
    }
});

// Route pour supprimer un article par son id
app.delete('https://www.wearewework.com/api/articles/:id', (req, res) => {
    const articles = readArticles();
    const newArticles = articles.filter(a => a.id !== req.params.id);
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
