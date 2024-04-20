
const mongoose = require('mongoose');

const betailSchema = new mongoose.Schema({
    nom_betail: { type: String, required: true },
    id_categorie: { type: mongoose.Schema.Types.ObjectId, ref: 'CategorieBetail', required: true },
    race: { type: String, required: true },
    sexe: { type: String, enum: ['masculin', 'féminin'], required: true },
    image_betail: { type: String, required: true },
    alimentation: { type: String, required: true },
    quantite_aliment_par_jour_kg: { type: Number, required: true },
    frequence_suivi_sante: { type: String, required: true },
    commentaires_sante: { type: String, required: true },
    etat_betail: { type: String, required: true }
});

module.exports = mongoose.model('Betail', betailSchema);