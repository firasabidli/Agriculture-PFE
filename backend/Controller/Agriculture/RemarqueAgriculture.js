const RemarqueAgriculture = require('../../Model/Agriculture/RemarqueAgriculture');
const Utilisateur=require('../../Model/Authentification/Utilisateur');
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
// enregistrer le commentaire /remarque
exports.create=async(req,res)=>{
    try{

        const {Agriculteur,nom_culture,option_Commentaire,commentaire}=req.body;
        const visible='alert-primary';
        if(!option_Commentaire){
            return res.status(400).json({ error: 'option du commentaire n est pas selection.' });
        }
        if(!commentaire){
            return res.status(400).json({ error: 'commentaire est vide.' });
        }
        if(!nom_culture){
            return res.status(400).json({ error: 'nom_culture est vide.' });
        }
        const newRemarque= new RemarqueAgriculture({
            Agriculteur,
            nom_culture,
            visible,
            option_Commentaire,
            commentaire
        });
        const savedRemarque= await newRemarque.save();
        res.status(201).json({ message: 'Commentaire enregistrer  avec succès', remarque: savedRemarque });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}
exports.createResponse = async (req, res) => {
    try {
        const { commentaireId, contenu, auteurId } = req.body;
        const commentaire = await RemarqueAgriculture.findById(commentaireId);
        if (!commentaire) {
            return res.status(404).json({ error: "Commentaire non trouvé" });
        }
        commentaire.reponses.push({ contenu, auteur: auteurId }); 
        const savedCommentaire = await commentaire.save();
        res.status(201).json({ message: 'Réponse enregistrée avec succès', commentaire: savedCommentaire });
        //envoyer email
        const cheminLogo = path.join(__dirname, '../../src/assets//logo.png');
    const lienApp = 'http://localhost:3000/';
    const Agriculteur = await Utilisateur.findById(commentaire.Agriculteur);
if (!Agriculteur) {
    console.error('Agriculteur non trouvé pour l\'ID donné');
    return; // Arrêtez le processus si l'agriculteur n'est pas trouvé
}

const emailAgriculteur = Agriculteur.email;
    console.log('email',emailAgriculteur)
    const mailOptions = {
      from: process.env.SMTP_MAIL,
      to: emailAgriculteur,
      subject: 'Nouvelle réponse à votre commentaire',
      html: `
      <html>
      <body>
        <div>
          <img src="cid:logo" alt="Logo de votre application" style="text-align: center;">
          <h1>Bonjour ${Agriculteur.nom},</h1>
          <p>Une nouvelle réponse a été ajoutée à votre commentaire sur <span style="font-weight: bold;">${commentaire.nom_culture}</span> en option <span style="font-weight: bold;">${commentaire.option_Commentaire}</span>:</p>
          <p>Commentaire : <span style="font-weight: bold;">${commentaire.commentaire}</span></p>
          <p>Réponse :<span style="font-weight: bold;"> ${contenu}</span></p>
          <p>Cordialement,</p>
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
        res.status(400).json({ error: error.message });
    }
}
exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { visible } = req.body;

       const remarque= await RemarqueAgriculture.findByIdAndUpdate(id, { visible });

        res.status(200).json({ message: 'Visibilité du commentaire mise à jour avec succès.', data: remarque });
    } catch (error) {
        console.error('Erreur lors de la mise à jour de la visibilité du commentaire :', error);
        res.status(500).json({ message: 'Une erreur s\'est produite lors de la mise à jour de la visibilité du commentaire.' });
    }
  };
exports.getByDate = async (req, res) => {
    try {
        const remarques = await RemarqueAgriculture.find({})
            .sort({ date_enregistrement:-1 })
            .populate('Agriculteur');
            for (let remarque of remarques) {
                const agriculteurId = remarque.Agriculteur;
                const agriculteur = await Utilisateur.findById(agriculteurId);
                remarque.Agriculteur = agriculteur;
            }
    
        res.status(200).json(remarques); 
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.delete= (req, res) => {
    RemarqueAgriculture.deleteOne({ _id: req.params.id })
  .then(() => res.status(200).json({success : true, message: 'Supprimer !'}))
  .catch(error => res.status(400).json({ error }));
};