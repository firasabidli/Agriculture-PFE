const mongoose = require('mongoose');

const alimentsAnimalSchema = new mongoose.Schema({
    dateAchat: { type: Date, required: true },
    quantite:{ type: Number, required: true },
    unite:{ type: String, required: true },
    prix:{ type: Number, required: true },
    total:{ type: Number, required: true },
    aliments:{ type: String, enum: ['Balles de foins', 'Grain','Fourrage'], required: true },
    idAgriculteur: { type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur' },
});

module.exports = mongoose.model('AlimentsAnimal', alimentsAnimalSchema);
