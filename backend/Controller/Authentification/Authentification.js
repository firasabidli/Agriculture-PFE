const argon2 = require('argon2');
const Utilisateur = require('../../Model/Authentification/Utilisateur');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const multer = require('multer');
const path = require('path');
require('dotenv').config();
//storage du image
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/assets/images/Utilisateur/Admin');
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage: storage }).single('image');
exports.get  = (req, res) => {
  Utilisateur.find()
    .then(Utilisateurs => res.status(200).json(Utilisateurs))
    .catch(err => res.status(400).json({error: err.message}));

};
function generateAuthToken(userId) {
  const authTokenLength = 64;
  const authToken = crypto.randomBytes(authTokenLength).toString('hex');
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
}
//enregister utilisateur
exports.create = async (req, res) => {
  const { cin, nom, gouvernorat, adresse, email, dateNaissance, numeroTelephone, password } = req.body;
  const accepte = '0';

  try {
      const existingUser = await Utilisateur.findOne({ $or: [{ cin }, { email }] });
      if (existingUser) {
          return res.status(400).json({ error: 'Un utilisateur avec cet email ou ce CIN existe déjà.' });
      }

      const hashedPassword = await argon2.hash(password);
      const newAgriculteur = new Utilisateur.Agriculteur({
          cin,
          nom,
          gouvernorat: {
            nom: gouvernorat.nom,
            latitude: gouvernorat.latitude,
            longitude: gouvernorat.longitude
          },
          adresse,
          email,
          dateNaissance,
          numeroTelephone,
          accepte,
          password: hashedPassword,
      });
      await newAgriculteur.save();
      const authToken = generateAuthToken(newAgriculteur._id);

      // Retourner le jeton d'authentification en tant que réponse
      return res.status(201).json({ message: 'Utilisateur créé avec succès', authToken });
    } catch (error) {
      console.error('Erreur lors de la création de l\'utilisateur agricole :', error);
      return res.status(500).json({ error: 'Erreur interne du serveur lors de la création de l\'utilisateur agricole. Veuillez réessayer plus tard.' });
  }
};
//authentification
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
      const authToken = generateAuthToken(user._id);
      
      return res.status(200).json({ message: 'Connexion réussie', authToken, user });
    } catch (error) {
      console.error('Erreur lors de la connexion de l\'utilisateur :', error);
      return res.status(500).json({ error: 'Erreur interne du serveur lors de la connexion de l\'utilisateur. Veuillez réessayer plus tard.' });
    }
  };



// Fonction pour créer un compte Administrateur
exports.createAdmin = async (cin, nom, adresse, email, dateNaissance, numeroTelephone, password) => {
    const accepte = '1';

    try {
        const hashedPassword = await argon2.hash(password);
        const newAdmin = new Utilisateur.Admin({
            cin,
            nom,
            gouvernorat: {
              nom: gouvernorat.nom,
              latitude: gouvernorat.latitude,
              longitude: gouvernorat.longitude
            },
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
//function pour déconnecter
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
    if (!authToken) {
        return res.status(401).json({ error: 'Token d\'authentification manquant' });
    }
    jwt.verify(authToken, process.env.JWT_SECRET, (err, decodedToken) => {
        if (err) {
            return res.status(401).json({ error: 'Token d\'authentification invalide' });
        } else {
            req.user = decodedToken.user;
            next();
        }
    });
};
//modifier image Admin
exports.updateImageAdmin = async (req, res, next) => {
  upload(req, res, async function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Aucun fichier n'a été téléchargé" });
    }
    const newImage = req.file.filename;
    const admin = await Utilisateur.Admin.findByIdAndUpdate({ _id: req.params.id }, { image: newImage }, { new: true });

    if (!admin) {
      return res.status(404).json({ message: "Utilisateur administrateur non trouvé" });
    }

    res.status(200).json(admin);
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'image de l'utilisateur administrateur :", error);
    res.status(500).json({ message: "Erreur lors de la mise à jour de l'image de l'utilisateur administrateur" });
  }
})
};
// affucher user selon id
exports.getUserId= async(req,res)=>{
  try {
    const agriculteur = await Utilisateur.findById(req.params.id);
    res.json(agriculteur);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des détails de l\'agriculteur', error });
  }
}