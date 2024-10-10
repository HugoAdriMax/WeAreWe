// api/articles.js

export default function handler(req, res) {
    if (req.method === 'GET') {
        // Logique pour récupérer les articles
        res.status(200).json(articles); // Remplacez 'articles' par vos données
    } else if (req.method === 'POST') {
        // Logique pour ajouter un article
        const newArticle = req.body;
        // Ajoutez votre logique ici
        res.status(201).json(newArticle);
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
