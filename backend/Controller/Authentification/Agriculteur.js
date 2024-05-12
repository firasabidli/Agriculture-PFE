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
