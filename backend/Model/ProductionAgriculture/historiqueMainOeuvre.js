const mongoose = require('mongoose');

const MainOeuvreSchema = new mongoose.Schema({
  idCulture: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FicheAgriculture',
    required: true
  },
  nom: {
    type: String,
    required: true
  },
  typeTravail: {
    type: String,
    required: true
  },
  nombreHeures: {
    type: Number,
    required: true
  },
  prixParHeure: {
    type: Number,
    required: true
  },
  prixTotal: {
    type: Number,
    required: true
  },
  dateTravail: {
    type: Date,
    default: Date.now
  }
});
const MainOeuvre = mongoose.model('HistoriqueMainOeuvre', MainOeuvreSchema);

module.exports = MainOeuvre;