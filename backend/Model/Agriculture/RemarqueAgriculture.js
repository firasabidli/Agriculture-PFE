const mongoose = require('mongoose');

const commentaireSchema = new mongoose.Schema({
    Agriculteur:{ type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur' },
    nom_culture:{ type: String },
    visible:{type:String},
    option_Commentaire: { type: String },
    commentaire:{ type: String },
    date_enregistrement: {
        type: Date,
        default: Date.now 
      },
      reponses: [{ 
        contenu: { type: String },
        date: { type: Date, default: Date.now },
        auteur: { type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur' } 
    }]
});

module.exports = mongoose.model('CommentaireAgriculture', commentaireSchema);