const mongoose = require('mongoose');
const HealthStateSchema = new mongoose.Schema({
    Agriculteur:{ type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur' },
    AnimalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Animaux' },
    dateEnregistrement: {
      type: Date,
      required: true,
    },
    etatSante: {
      type: String,
      enum: ['bon', 'moyen', 'mauvais'],
      required: true,
    },
    maladiesSymptomes: {
      type: String,
      required: true,
    },
    traitements: [{
      medicament: {
        type: String,
        required: true,
      },
      dose: {
        type: String,
        required: true,
      },
      frequence: {
        type: String,
        required: true,
      },
    }],
    vaccinations: [{
      nomVaccin: {
        type: String,
        required: true,
      },
      dateAdministration: {
        type: Date,
        required: true,
      },
    }],
    observationsGenerales: {
      type: String,
      required: true,
    },
  });
module.exports = mongoose.model('HealthState', HealthStateSchema);