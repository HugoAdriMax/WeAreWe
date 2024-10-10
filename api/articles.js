// api/articles.js

let articles = []; // Définissez un tableau d'articles

export default function handler(req, res) {
    if (req.method === 'GET') {
        // Renvoie la liste des articles
        res.status(200).json(articles);
    } else if (req.method === 'POST') {
        // Ajoute un nouvel article
        const newArticle = req.body;

        // Vérifie que l'article contient les champs requis
        if (!newArticle.title || !newArticle.author || !newArticle.content) {
            return res.status(400).json({ message: 'Titre, auteur et contenu requis.' });
        }

        // Ajoute le nouvel article au tableau
        articles.push(newArticle);
        res.status(201).json(newArticle);
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
