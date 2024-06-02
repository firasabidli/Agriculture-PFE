const mongoose = require('mongoose');

const AnimalSchema = new mongoose.Schema({
    Agriculteur:{ type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur' },
    categorieBetail:{type:String , required : true},
    subCategorieBetail:{type:String, required:true},
    Race:{type:String, required: true},
    date_naissance :{ type: Date, required: true },
    IdantifiantsAnimal  :{ type: String, required: true, unique: true},
    sexe: { type: String, required: true },
    HealthState: [{ type: mongoose.Schema.Types.ObjectId, ref: 'HealthState' }],
    MovementBétail: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MovementBétail' }]
});

module.exports = mongoose.model('Animaux', AnimalSchema);