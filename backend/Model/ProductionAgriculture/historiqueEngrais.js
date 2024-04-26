const mongoose = require('mongoose');

const engraisHistoriqueSchema = new mongoose.Schema({
  idCulture: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FicheAgriculture',
    required: true
  },
  type: {
    type: String,
    required: true
  },
  quantite: {
    type: Number,
    required: true
  },
  dateApplication: {
    type: Date,
    required: true
  },
  champ: {
    type: String,
    required: true
  },
  prix: {
    type: Number,
    required: true
  }
});

const EngraisHistorique = mongoose.model('EngraisHistorique', engraisHistoriqueSchema);

module.exports = EngraisHistorique;
