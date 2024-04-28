const mongoose = require('mongoose');
const EquipementSchema = new mongoose.Schema({
  idCulture: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FicheAgriculture',
    required: true
  },
  nom: {
    type: String,
    required: true
  },
  prixParHeure: {
    type: Number,
    required: true
  },
  nombreHeures: {
    type: Number,
    required: true
  },
  prixTotalEq: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Equipement = mongoose.model('HistoriqueEquipement', EquipementSchema);

module.exports = Equipement;
