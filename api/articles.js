// Stockage en mémoire des articles
let articles = [];

// Charger les articles depuis le fichier JSON lors du démarrage
const fs = require('fs');
const path = require('path');
const articlesFilePath = path.join(__dirname, './articles.json');

// Charger les articles depuis le fichier JSON si disponible
if (fs.existsSync(articlesFilePath)) {
    try {
        articles = JSON.parse(fs.readFileSync(articlesFilePath, 'utf8'));
        console.log("Articles chargés depuis le fichier JSON.");
    } catch (err) {
        console.error('Erreur lors du chargement des articles :', err);
    }
}

module.exports = (req, res) => {
    if (req.method === 'GET') {
        // Renvoyer tous les articles
        res.json(articles);
    } else if (req.method === 'POST') {
        try {
            const { title, url, metaDescription, imageUrl, content } = req.body;

            // Vérifie que tous les champs requis sont présents
            if (!title || !metaDescription || !content || !imageUrl) {
                return res.status(400).json({ error: 'Champs manquants' });
            }

            // Générer le slug SEO-friendly si non fourni
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

            // Ajouter le nouvel article en mémoire
            articles.push(newArticle);
            res.json(newArticle);
        } catch (err) {
            console.error('Erreur lors de la création de l\'article :', err);
            res.status(500).json({ error: 'Erreur lors de la création de l\'article' });
        }
    } else if (req.method === 'PUT') {
        // Mettre à jour un article existant
        const updatedArticle = req.body;
        const index = articles.findIndex(article => article.slug === updatedArticle.slug);

        if (index !== -1) {
            articles[index] = { ...articles[index], ...updatedArticle };
            res.json(updatedArticle);
        } else {
            res.status(404).json({ error: 'Article non trouvé' });
        }
    } else if (req.method === 'DELETE') {
        // Supprimer un article
        const { slug } = req.query;
        const initialLength = articles.length;
        articles = articles.filter(article => article.slug !== slug);

        if (articles.length !== initialLength) {
            res.json({ success: true });
        } else {
            res.status(404).json({ error: 'Article non trouvé' });
        }
    } else {
        res.status(405).json({ error: 'Méthode non autorisée' });
    }
};
