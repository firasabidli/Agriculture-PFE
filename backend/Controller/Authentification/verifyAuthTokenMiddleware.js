const jwt = require('jsonwebtoken');

function verifyAuthToken(req, res, next) {
    // Récupérer le token d'authentification depuis les en-têtes de la requête
    const authToken = req.headers.authorization;

    // Vérifier si le token d'authentification est présent
    if (!authToken) {
        return res.status(401).json({ error: 'Token d\'authentification manquant' });
    }

    // Extraire le token de la chaîne "Bearer <token>"
    const token = authToken.split(' ')[1];

    // Vérifier la validité du token d'authentification
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        if (err) {
            return res.status(401).json({ error: 'Token d\'authentification invalide' });
        } else {
            // Le token d'authentification est valide, décoder les informations utilisateur
            req.user = decodedToken.user;
            next();
        }
    });
}

module.exports = verifyAuthToken;
