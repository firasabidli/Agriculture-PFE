const Utilisateur = require('../../Model/Authentification/Utilisateur');
const expressAsyncHandler = require("express-async-handler");
const path = require('path');
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
dotenv.config();

let transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  secure: false,
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});
//afficher agriculteur
exports.getAgriculteur = async (req, res) => {
    try {
      const agriculteurs = await Utilisateur.find({ accepte: '1', role: 'Agriculteur' });
      res.status(200).json(agriculteurs);
      console.log("Agriculteurs avec accepte == '1' :", agriculteurs);
    } catch (error) {
      console.error("Erreur lors de la recherche des agriculteurs :", error);
      res.status(500).json({ error: "Erreur lors de la recherche des agriculteurs" });
    }
  }
  //Post agriculteur 
  exports.postAgriculteur = async (req, res) => {
    try {
      const selectedAgriculteursIds = req.body.selectedAgriculteursIds;
      const message = req.body.message;
  
      // Récupérer les détails des agriculteurs sélectionnés depuis la base de données
      const selectedAgriculteurs = await Utilisateur.find({ _id: { $in: selectedAgriculteursIds } });
  
      // Préparer et envoyer un e-mail à chaque agriculteur sélectionné
      selectedAgriculteurs.forEach(async (agriculteur) => {
        const cheminLogo = path.join(__dirname, '../../src/assets//logo.png');
        const mailOptions = {
          from: process.env.SMTP_MAIL,
          to: agriculteur.email,
          subject: 'Activation de compte',
          html: `
            <html>
              <body>
                <div >
                  <img src="cid:logo" alt="Logo de votre application" style="text-align: center;">
                  <h1>Salut ${agriculteur.nom},</h1>
                  <p>${message}</p>
                </div>
              </body>
            </html>
          `,
          attachments: [{
            filename: 'logo.png',
            path: cheminLogo,
            cid: 'logo' 
          }]
        };
  
        // Envoi de l'e-mail
        await transporter.sendMail(mailOptions);
      });
  
      // Envoyer une réponse réussie une fois tous les e-mails envoyés
      res.status(200).json({ message: 'E-mails envoyés avec succès' });
    } catch (error) {
      console.error('Erreur lors de l\'envoi des e-mails :', error);
      res.status(500).json({ error: 'Erreur lors de l\'envoi des e-mails' });
    }
  };
  
 

// Contrôleur pour obtenir le nombre d'agriculteurs pour chaque gouvernorat
exports.getNombreAgriculteursParGouvernorat = async (req, res) => {
  try {
    // Liste des gouvernorats à tester
    const gouvernorats = [
      { nom: 'Ariana', latitude: 36.9833, longitude: 10.1167 },
      { nom: 'Béja', latitude: 36.7256, longitude: 9.1817 },  
      { nom: 'Ben Arous', latitude: 36.7531, longitude: 10.2189 },  
      { nom: 'Bizerte', latitude: 37.0833, longitude: 9.5833 },
      { nom: 'Gabès', latitude: 33.8333, longitude: 9.75 },
      { nom: 'Gafsa', latitude: 34.5, longitude: 9 },  
      { nom: 'Jendouba', latitude: 36.6667, longitude: 8.75 }, 
      { nom: 'Kairouan', latitude: 35.5833, longitude: 9.8333 }, 
      { nom: 'Kasserine', latitude: 35.25, longitude: 8.7833 },
      { nom: 'Kébili', latitude: 33.5, longitude: 8.8333 }, 
      { nom: 'Le Kef', latitude: 36.0833, longitude: 8.75 }, 
      { nom: 'Mahdia', latitude: 35.3333, longitude: 10.5833 }, 
      { nom: 'La Manouba', latitude: 36.8333, longitude: 9.8333 }, 
      { nom: 'Médenine', latitude: 33.3333, longitude: 11 }, 
      { nom: 'Monastir', latitude: 35.6167, longitude: 10.75 },
      { nom: 'Nabeul', latitude: 36.6667, longitude: 10.6667 }, 
      { nom: 'Sfax', latitude: 34.75, longitude: 10.4167 }, 
      { nom: 'Sidi Bouzid', latitude: 35.0382, longitude: 9.4849 }, 
      { nom: 'Siliana', latitude: 36, longitude: 9.3333 }, 
      { nom: 'Sousse', latitude: 35.9167, longitude: 10.4167 }, 
      { nom: 'Tataouine', latitude: 32, longitude: 10 }, 
      { nom: 'Tozeur', latitude: 34, longitude: 8.0833 }, 
      { nom: 'Tunis', latitude: 36.7667, longitude: 10.1333 }, 
      { nom: 'Zaghouan', latitude: 36.3333, longitude: 10 }, 
    ];

    // Initialiser un objet pour stocker le nombre d'agriculteurs pour chaque gouvernorat
    const nombreAgriculteursParGouvernorat = {};

    // Boucle à travers chaque gouvernorat
    for (const gouvernorat of gouvernorats) {
      // Compter le nombre d'agriculteurs pour le gouvernorat en cours
      const count = await Utilisateur.Agriculteur.countDocuments({
        'gouvernorat.nom': gouvernorat.nom,
      });

      // Ajouter le nombre d'agriculteurs au gouvernorat correspondant dans l'objet
      nombreAgriculteursParGouvernorat[gouvernorat.nom] = count;
    }

    // Répondre avec l'objet contenant le nombre d'agriculteurs pour chaque gouvernorat
    res.json(nombreAgriculteursParGouvernorat);
  } catch (error) {
    console.error('Erreur lors de la récupération du nombre d\'agriculteurs par gouvernorat :', error);
    res.status(500).json({ message: 'Une erreur est survenue lors du traitement de la requête.' });
  }
};
