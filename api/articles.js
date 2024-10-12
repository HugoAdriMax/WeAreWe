const fs = require('fs');
const path = require('path');

const articlesFilePath = path.join(__dirname, './articles.json');
const cors = require('cors');

// Ajouter le middleware CORS
app.use(cors({
    origin: '*', // Autorise toutes les origines
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Lire les articles à partir du fichier JSON
function readArticles() {
    try {
        if (fs.existsSync(articlesFilePath)) {
            const data = fs.readFileSync(articlesFilePath, 'utf8');
            return JSON.parse(data);
        }
    } catch (err) {
        console.error('Erreur lors de la lecture du fichier articles.json :', err);
    }
    return [];
}

// Écrire les articles dans le fichier JSON
function writeArticles(articles) {
    try {
        fs.writeFileSync(articlesFilePath, JSON.stringify(articles, null, 2));
    } catch (err) {
        console.error('Erreur lors de l\'écriture dans le fichier articles.json :', err);
    }
}

module.exports = (req, res) => {
    if (req.method === 'GET') {
        // Lire tous les articles
        const articles = readArticles();
        res.json(articles);
    } else if (req.method === 'POST') {
        try {
            const { title, url, metaDescription, imageUrl, content } = req.body;

            // Vérifie que tous les champs requis sont présents
            if (!title || !metaDescription || !content || !imageUrl) {
                return res.status(400).json({ error: 'Champs manquants' });
            }

            // Générer le slug SEO-friendly si pas fourni
            const slug = url || title.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

            const newArticle = {
                id: Date.now().toString(),
                title,
                slug, // Utiliser l'URL SEO-friendly
                metaDescription,
                imageUrl,
                content,
                date: new Date().toISOString(),
                author: 'WeAreWe Team' // Auteur par défaut
            };

            const articles = readArticles();
            articles.push(newArticle);
            writeArticles(articles);
            res.json(newArticle);
        } catch (err) {
            console.error('Erreur lors de la création de l\'article :', err);
            res.status(500).json({ error: 'Erreur lors de la création de l\'article' });
        }
    } else if (req.method === 'PUT') {
        // Mettre à jour un article existant
        const updatedArticle = req.body;
        const articles = readArticles();
        const index = articles.findIndex(article => article.slug === updatedArticle.slug);

        if (index !== -1) {
            articles[index] = { ...articles[index], ...updatedArticle };
            writeArticles(articles);
            res.json(updatedArticle);
        } else {
            res.status(404).json({ error: 'Article non trouvé' });
        }
    } else if (req.method === 'DELETE') {
        // Supprimer un article
        const { slug } = req.query;
        let articles = readArticles();
        const initialLength = articles.length;
        articles = articles.filter(article => article.slug !== slug);

        if (articles.length !== initialLength) {
            writeArticles(articles);
            res.json({ success: true });
        } else {
            res.status(404).json({ error: 'Article non trouvé' });
        }
    } else {
        res.status(405).json({ error: 'Méthode non autorisée' });
    }
};
