const mongoose = require('mongoose');
const stockSchema = new mongoose.Schema({
  Agriculteur:{ type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur' },
    libellé: { type: String, required: true },
    date: { type: Date, required: true },
    quantitéGénérale: { type: Number, required: true },
    entrées: [{
        dateEntrée: { type: Date, required: true },
        quantitéEntrée: { type: Number, required: true },
        uniteEntrée: {
          type: String,
      },
        raisonEntrée: { type: String },
        prix:{type:String}
      }],
    sortie:[{
    dateSortie: { type: Date },
    quantitéSortie: { type: Number },
    uniteSortie: {
      type: String,
  },
    raisonSortie: { type: String },
    prix:{type:String},
    adresseClient:{type:String},
    nomClient:{type:String}
     }],
    emplacement: { type: String, required: true },
    ville: { type: String, required: true },
    typeStocks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CategorieAgriculture' }]
  });
  
  const Stock = mongoose.model('GestionStock', stockSchema);
  
  module.exports = Stock;