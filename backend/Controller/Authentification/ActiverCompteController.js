const UserModel = require('../../Model/Authentification/Utilisateur');

const path = require('path');
// const { sendEmail } = require('./sendEmail');
const expressAsyncHandler = require("express-async-handler");
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
// Récupérer tous les comptes à activer (accepte = 0)
exports.all = async (req, res) => {
  try {
    const agriculteurs = await UserModel.Agriculteur.find({ accepte: 0 });
    res.status(200).json(agriculteurs);
  } catch (error) {
    console.error('Erreur lors de la récupération des comptes à activer :', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
};
exports.activer = async (req, res) => {
  const agriculteurId = req.params.id;

  try {
    const agriculteur = await UserModel.Agriculteur.findById(agriculteurId);
    if (!agriculteur) {
      return res.status(404).json({ error: 'Agriculteur non trouvé' });
    }

    agriculteur.accepte = 1;
    await agriculteur.save();
    const cheminLogo = path.join(__dirname, '../../src/assets//logo.png');
    const lienApp = 'http://localhost:3000/';
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
              <p>Votre compte a été activé avec succès dans l'application agricole. Vous pouvez désormais accéder à notre application en suivant ce lien :</p>
              <a href="${lienApp}">Accéder à l'application</a>
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
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log('Erreur lors de l\'envoi de l\'e-mail :', error);
        return res.status(500).json({ error: 'Erreur lors de l\'envoi de l\'e-mail' });
      } else {
        console.log('E-mail envoyé avec succès !');
        return res.status(200).json({ message: 'Compte agriculteur activé avec succès' });
      }
    });

  } catch (error) {
    console.error('Erreur lors de l\'activation du compte agriculteur :', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
};


// Refuser et supprimer un compte (accepte = -1)
exports.refuser = async (req, res) => {
  const agriculteurId = req.params.id;

  try {
    const deletedAgriculteur = await UserModel.Agriculteur.findByIdAndDelete(agriculteurId);
    if (!deletedAgriculteur) {
      return res.status(404).json({ error: 'Agriculteur non trouvé' });
    }

    res.status(200).json({ message: 'Compte agriculteur refusé et supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors du refus et de la suppression du compte agriculteur :', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
};
