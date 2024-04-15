const mongoose = require('mongoose');

const categorieSchema = new mongoose.Schema({
    nom_categorieBetail: { type: String, required: true },
    description:{ type: String, required: true },
    betails: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Betail' }],
});

module.exports = mongoose.model('CategorieBetail', categorieSchema);