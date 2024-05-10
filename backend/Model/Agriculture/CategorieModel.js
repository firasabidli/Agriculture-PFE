const mongoose = require('mongoose');

const categorieSchema = new mongoose.Schema({
    nom_categorie: { type: String, required: true },
    description:{ type: String, required: true },
    Agricultures: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Agriculture' }],
    FicheAgriculture: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FicheAgriculture' }]
});

module.exports = mongoose.model('CategorieAgriculture', categorieSchema);