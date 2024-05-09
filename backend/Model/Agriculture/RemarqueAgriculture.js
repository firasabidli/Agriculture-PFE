const mongoose = require('mongoose');

const commentaireSchema = new mongoose.Schema({
    Agriculteur:{ type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur' },
    nom_culture:{ type: String, required: true },
    visible:{type:String, required: true},
    option_Commentaire: { type: String, required: true },
    commentaire:{ type: String, required: true },
    date_enregistrement: {
        type: Date,
        default: Date.now 
      }
});

module.exports = mongoose.model('CommentaireAgriculture', commentaireSchema);