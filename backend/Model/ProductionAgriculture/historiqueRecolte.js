const mongoose = require('mongoose');

const RecolteSchema = new mongoose.Schema({
    idCulture: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FicheAgriculture',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    balles: [{
        nombreBalles: {
            type: Number,
            default: 0,
        },
        prixTotalBalle: {
            type: Number,
            default: 0,
        },
        prixVenteParBalle: {
            type: Number,
            default: 0,
        }
    }],
    quantites: [{
        quantite: {
            type: Number,
            default: 0,
        },
        unite: {
            type: String,
        },
        prix: {
            type: String,
            default: 0,
        },
        prixTotalVente: {
            type: Number,
            default: 0,
        }
    }],
    revenuTotal: {
        type: Number,
        required: true
    }
});

const Recolte = mongoose.model('HistoriqueRecolte', RecolteSchema);

module.exports = Recolte;
