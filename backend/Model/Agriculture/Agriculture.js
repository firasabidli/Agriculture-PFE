const mongoose = require('mongoose');

const AgricultureSchema = new mongoose.Schema({
    nom_agriculture: String,
    description:String,
    date_plantation: String,
    date_recolte: String,
    methode_irrigation: String,
    quantite_eau_irrigation: Number,
    frequence_surveillance: String,
    date_derniere_surveillance: String,
    image_agriculture: String,
    remarques: String,
  saison: { type: mongoose.Schema.Types.ObjectId, ref: 'Saison' },
  categorie: { type: mongoose.Schema.Types.ObjectId, ref: 'Categorie' },
  materiels: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Materiel' }],
  MethodesStock: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MethodeStock' }],
  MedicamentsCulture: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MedicamentCulture' }]
});

module.exports = mongoose.model('Agriculture', AgricultureSchema);