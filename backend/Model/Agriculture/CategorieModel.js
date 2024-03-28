const mongoose = require('mongoose');

const categorieSchema = new mongoose.Schema({
    nom_categorie: { type: String, required: true },
    description:{ type: String, required: true },
    Agricultures: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Agriculture' }]
});

module.exports = mongoose.model('Categorie', categorieSchema);