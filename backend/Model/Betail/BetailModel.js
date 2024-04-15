const mongoose = require('mongoose');

const betailSchema = new mongoose.Schema({
    categorie_betail: { type: mongoose.Schema.Types.ObjectId, ref: 'CategorieBetail' },
    nom_betail : { type: String, required: true },
    image_betail : { type: String, required: true },
    date_naissance :{ type: Date, required: true },
    IdantifiantsAnimal  :{ type: String, required: true, unique: true},
    sexe: { type: String, enum: ['masculin', 'féminin'], required: true },
});

module.exports = mongoose.model('Betail', betailSchema);