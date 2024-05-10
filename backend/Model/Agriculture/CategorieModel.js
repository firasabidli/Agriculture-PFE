const mongoose = require('mongoose');

const categorieSchema = new mongoose.Schema({
    nom_categorie: { type: String, required: true },
    description:{ type: String, required: true },
    Agricultures: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Agriculture' }],
    FicheAgriculture: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FicheAgriculture' }],
    Equipements:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Materiel' }],
    MethodeStockage:[{ type: mongoose.Schema.Types.ObjectId, ref: 'MethodeStock' }],
    Engrais:[{ type: mongoose.Schema.Types.ObjectId, ref: 'MedicamentCulture' }]
});

module.exports = mongoose.model('CategorieAgriculture', categorieSchema);