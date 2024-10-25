export default function handler(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.send(`User-agent: *
Disallow: /api/
Allow: /
Sitemap: https://www.tolly.fr/api/sitemap`);
}
