const mongoose = require('mongoose');

const categorieSchema = new mongoose.Schema({
    nom_categorie: { type: String, required: true },
    description:{ type: String, required: true },
});

module.exports = mongoose.model('Categorie', categorieSchema);