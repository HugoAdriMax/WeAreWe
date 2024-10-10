const fs = require('fs');
const path = require('path');

const articlesFilePath = path.join(__dirname, '../articles.json'); // Assurez-vous que le chemin est correct

// Fonction pour lire les articles
function readArticles() {
    if (fs.existsSync(articlesFilePath)) {
        return JSON.parse(fs.readFileSync(articlesFilePath));
    }
    return [];
}

// Route pour récupérer tous les articles
module.exports = (req, res) => {
    const articles = readArticles();
    res.json(articles);
};
