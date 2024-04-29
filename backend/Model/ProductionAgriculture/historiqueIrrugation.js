const mongoose = require('mongoose');

const IrrigationSchema = new mongoose.Schema({
    idCulture: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FicheAgriculture',
        required: true
      },
    date: {
        type: Date,
        required: true
    },
    duree: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        enum: ['goutte-à-goutte', 'asperseur', 'canal', 'autre'],
        required: true
    },
    prixParHeure: {
        type: Number,
        required: true
    },
    coutTotal: {
        type: Number,
        required: true
    }
});

const Irrigation = mongoose.model('HistoriqueIrrigation', IrrigationSchema);

module.exports = Irrigation;
