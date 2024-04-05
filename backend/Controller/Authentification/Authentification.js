const argon2 = require('argon2');
const Utilisateur = require('../../Model/Authentification/Utilisateur'); // Importer le modèle Utilisateur approprié
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
exports.get  = (req, res) => {
  Utilisateur.find()
    .then(Utilisateurs => res.status(200).json(Utilisateurs))
    .catch(err => res.status(400).json({error: err.message}));

};
exports.create = async (req, res) => {
  const { cin, nom, adresse, email, dateNaissance, numeroTelephone, password } = req.body;
  const accepte = '1';

  try {
      // Vérifier si l'email ou le CIN existe déjà dans la base de données
      const existingUser = await Utilisateur.findOne({ $or: [{ cin }, { email }] });
      if (existingUser) {
          return res.status(400).json({ error: 'Un utilisateur avec cet email ou ce CIN existe déjà.' });
      }

      const hashedPassword = await argon2.hash(password);
      const newAgriculteur = new Utilisateur.Agriculteur({
          cin,
          nom,
          adresse,
          email,
          dateNaissance,
          numeroTelephone,
          accepte,
          password: hashedPassword,
      });
      await newAgriculteur.save();

      // Générer un jeton d'authentification aléatoire
      const authToken = generateAuthToken();

      // Retourner le jeton d'authentification en tant que réponse
      return res.status(201).json({ message: 'Utilisateur créé avec succès', authToken });
    } catch (error) {
      console.error('Erreur lors de la création de l\'utilisateur agricole :', error);
      return res.status(500).json({ error: 'Erreur interne du serveur lors de la création de l\'utilisateur agricole. Veuillez réessayer plus tard.' });
  }
};
// exports.login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//       const user = await Utilisateur.findOne({ email });
//       if (!user) {
//           return res.status(400).json({ error: 'Adresse e-mail ou mot de passe incorrect.' });
//       }
//       if (user.accepte !== '1') {
//           return res.status(400).json({ error: 'Votre compte n\'a pas encore été accepté.' });
//       }
//       const passwordValid = await argon2.verify(user.password, password);
//       if (!passwordValid) {
//           return res.status(400).json({ error: 'Adresse e-mail ou mot de passe incorrect.' });
//       }

//       const authToken = generateAuthToken();
//       return res.status(200).json({ message: 'Connexion réussie', authToken,user });
//   } catch (error) {
//       console.error('Erreur lors de la connexion de l\'utilisateur :', error);
//       return res.status(500).json({ error: 'Erreur interne du serveur lors de la connexion de l\'utilisateur. Veuillez réessayer plus tard.' });
//   }
// };
exports.login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await Utilisateur.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: 'Adresse e-mail ou mot de passe incorrect.' });
      }
      if (user.accepte !== '1') {
        return res.status(400).json({ error: 'Votre compte n\'a pas encore été accepté.' });
      }
      const passwordValid = await argon2.verify(user.password, password);
      if (!passwordValid) {
        return res.status(400).json({ error: 'Adresse e-mail ou mot de passe incorrect.' });
      }
  
      // Créer un token JWT
      //const authToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      const authToken = generateAuthToken();
      
      return res.status(200).json({ message: 'Connexion réussie', authToken, user });
    } catch (error) {
      console.error('Erreur lors de la connexion de l\'utilisateur :', error);
      return res.status(500).json({ error: 'Erreur interne du serveur lors de la connexion de l\'utilisateur. Veuillez réessayer plus tard.' });
    }
  };
// Fonction pour générer un jeton d'authentification aléatoire
function generateAuthToken() {
  const authTokenLength = 64;
  const authToken = crypto.randomBytes(authTokenLength).toString('hex');
  return authToken;
}





// Fonction pour créer un compte Administrateur
exports.createAdmin = async (cin, nom, adresse, email, dateNaissance, numeroTelephone, password) => {
    const accepte = '1';

    try {
        const hashedPassword = await argon2.hash(password);
        const newAdmin = new Utilisateur.Admin({
            cin,
            nom,
            adresse,
            email,
            dateNaissance,
            numeroTelephone,
            accepte,
            password: hashedPassword,
        });
        await newAdmin.save();

        return newAdmin;
    } catch (error) {
        throw error;
    }
};
exports.logout=(req,res)=>{
    req.session.destroy((err) => {
        if (err) {
          console.error('Error destroying session:', err);
          return res.status(500).json({ error: 'Server error' });
        }
        res.status(200).json({ message: 'Logout successful' });
      });
};
// Middleware pour vérifier le token d'authentification
exports.verifyAuthToken = (req, res, next) => {
    const authToken = req.headers.authorization;

    // Vérifier si le token d'authentification est présent
    if (!authToken) {
        return res.status(401).json({ error: 'Token d\'authentification manquant' });
    }

    // Vérifier la validité du token d'authentification
    jwt.verify(authToken, process.env.JWT_SECRET, (err, decodedToken) => {
        if (err) {
            return res.status(401).json({ error: 'Token d\'authentification invalide' });
        } else {
            // Le token d'authentification est valide, décoder les informations utilisateur
            req.user = decodedToken.user;
            next();
        }
    });
};
