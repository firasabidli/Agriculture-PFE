const mongoose = require('mongoose');

const categorieSchema = new mongoose.Schema({
    nom_categorieBetail: { type: String, required: true },
    description:{ type: String, required: true },
    races: [{ type: String, required: true  }],
    betails: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Betail' }],
    Animal: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Animal' }]
});

module.exports = mongoose.model('CategorieBetail', categorieSchema);