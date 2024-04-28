const mongoose = require('mongoose');

const ficheSchema = new mongoose.Schema({
    Agriculteur:{ type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur' },
    titre: { type: String, required: true },
    surface: { type: String, required: true },
    categorie: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CategorieAgriculture' }],
    description: { type: String },
    localisation: {type:String},
    quantiteSemences: { type: Number },
    datePlantation: { type: Date, required: true },
    prixSemence: { type: Number, required: true },
    prixTerrain: { type: Number, required: true },
    historiqueEngrais: [{ type: mongoose.Schema.Types.ObjectId, ref: 'EngraisHistorique' }],
    historiqueEquipement: [{ type: mongoose.Schema.Types.ObjectId, ref: 'HistoriqueEquipement' }]
});

const FicheAgriculture = mongoose.model('FicheAgriculture', ficheSchema);

module.exports = FicheAgriculture;
