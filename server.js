const express = require('express');
const app = express();
app.use(express.json());

// Stockage en mémoire des articles
let articles = [];  // Liste des articles en mémoire

// Charger les articles à partir du fichier JSON lors du démarrage (pour des sauvegardes manuelles)
const fs = require('fs');
const path = require('path');
const articlesFilePath = path.join(__dirname, './articles.json');

// Charger les articles depuis le fichier JSON si disponible
if (fs.existsSync(articlesFilePath)) {
    articles = JSON.parse(fs.readFileSync(articlesFilePath));
    console.log("Articles chargés depuis le fichier JSON.");
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
        // Sauvegarder les modifications
        saveArticlesToFile(); // ou équivalent pour sauvegarder
        res.status(204).send(); // Renvoie un 204 sans contenu
    } else {
        res.status(404).json({ error: 'Article non trouvé' });
    }
});


// Sauvegarder les articles manuellement (par exemple, via un appel à cette route)
app.get('/api/save-articles', (req, res) => {
    try {
        fs.writeFileSync(articlesFilePath, JSON.stringify(articles, null, 2));
        res.status(200).send('Articles sauvegardés dans le fichier JSON.');
    } catch (error) {
        console.error('Erreur lors de la sauvegarde des articles:', error);
        res.status(500).send('Erreur lors de la sauvegarde des articles.');
    }
});

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
