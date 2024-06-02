const mongoose = require('mongoose');

const productionSchema = new mongoose.Schema({
    idAgriculteur: { type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur' },
    idAnimal:  { type: mongoose.Schema.Types.ObjectId, ref: 'Animaux' },
    month: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    data: [{
        day: {
            type: Number,
            required: true
        },
        quantite: {
            type: Number
        },
        prix: {
            type: Number
        },
        total: {
            type: Number
        },
        
    }],
    productionTotal: {
        type: Number
    }
});

const Production = mongoose.model('Production', productionSchema);

module.exports = Production;
