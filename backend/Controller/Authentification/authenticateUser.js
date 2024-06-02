const jwt = require('jsonwebtoken');
require('dotenv').config();
// verifier est ce que agriculteur connecter or no
const authenticateUser = (req, res, next) => {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).json({ error: 'Token d\'authentification manquant' });
  }

  try {
    const token = authToken.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        console.error('Erreur de vérification du token JWT :', err.message);
        return res.status(401).json({ error: 'Token d\'authentification invalide' });
      } else {
        req.userId = decodedToken.userId; // Stocker l'ID utilisateur dans req
        next();
      }
    });
  } catch (error) {
    console.error('Erreur lors de la vérification du token JWT :', error.message);
    return res.status(401).json({ error: 'Token d\'authentification invalide' });
  }
};

module.exports = authenticateUser;
