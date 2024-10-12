const express = require('express');
const app = express();
app.use(express.json());

// Stockage en mémoire des articles
let articles = [];

app.get('/api/articles/:id', (req, res) => {
    articles = JSON.parse(fs.readFileSync(articlesFilePath, 'utf8')); // Recharger depuis le fichier
    console.log('Articles rechargés depuis le fichier JSON :', articles);
    const article = articles.find(a => a.id === req.params.id);
    if (article) {
        res.json(article);
    } else {
        console.log('Article non trouvé pour l\'ID :', req.params.id);
        res.status(404).send('Article non trouvé');
    }
});


// Route pour récupérer tous les articles
app.get('/api/articles', (req, res) => {
    res.json(articles);
});

// Route pour récupérer un article par ID
app.get('/api/articles/:id', (req, res) => {
    const article = articles.find(a => a.id === String(req.params.id));
    if (article) {
        res.json(article);
    } else {
        res.status(404).send('Article non trouvé');
    }
});

// Route pour créer un nouvel article
app.post('/api/articles', (req, res) => {
    const { title, url, metaDescription, imageUrl, content } = req.body;

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

// Route pour récupérer un article par ID
app.get('/api/articles/:id', (req, res) => {
    console.log('Articles en mémoire au moment de la requête :', articles);
    const article = articles.find(a => a.id === req.params.id);
    if (article) {
        res.json(article);
    } else {
        console.log('Article non trouvé pour l\'ID :', req.params.id);
        res.status(404).send('Article non trouvé');
    }
});





// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
