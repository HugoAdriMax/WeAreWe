const fs = require('fs');
const path = require('path');

const articlesFilePath = path.join(__dirname, '../articles.json');

// Lire les articles à partir du fichier JSON
function readArticles() {
    if (fs.existsSync(articlesFilePath)) {
        return JSON.parse(fs.readFileSync(articlesFilePath));
    }
    return [];
}

// Écrire les articles dans le fichier JSON
function writeArticles(articles) {
    fs.writeFileSync(articlesFilePath, JSON.stringify(articles, null, 2));
}

module.exports = (req, res) => {
    if (req.method === 'GET') {
        // Lire tous les articles
        const articles = readArticles();
        res.json(articles);
    } else if (req.method === 'POST') {
        // Créer un nouvel article
        const { title, url, metaDescription, imageUrl, content } = req.body;

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
    } else if (req.method === 'PUT') {
        // Mettre à jour un article existant
        const updatedArticle = req.body;
        const articles = readArticles();
        const index = articles.findIndex(article => article.slug === updatedArticle.slug);

        if (index !== -1) {
            // Mettre à jour l'article existant
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
        // Méthode non autorisée
        res.status(405).json({ error: 'Méthode non autorisée' });
    }
};
