const mongoose = require('mongoose');
const movementSchema = new mongoose.Schema({
    Agriculteur:{ type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur' },
    AnimalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Animaux' },
    movementDate: { type: Date, default: Date.now },
    movementType: String,
    origin: String,
    destination: String,
    priceAchat: { type: Number, default: 0 },
    priceVente: { type: Number, default: 0 },
    NomVendeur:{type: String},
    AdresseVendeur:{type: String},
    NumTelVendeur:{type: String},
    NomClient:{type:String},
    AdresseClient:{type:String},
    NumTelClient:{type:String},
    additionalDetails: String
});
module.exports = mongoose.model('MovementBétail', movementSchema);