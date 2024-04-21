const mongoose = require('mongoose');
//categorie_betail: { type: mongoose.Schema.Types.ObjectId, ref: 'CategorieBetail' },
// enum: ['masculin', 'féminin']
const AnimalSchema = new mongoose.Schema({
    Agriculteur:{type:String , required: true},
    categorieBetail:{type:String , required : true},
    subCategorieBetail:{type:String, required:true},
    Race:{type:String, required: true},
    date_naissance :{ type: Date, required: true },
    IdantifiantsAnimal  :{ type: String, required: true, unique: true},
    sexe: { type: String, required: true },
    HealthState: [{ type: mongoose.Schema.Types.ObjectId, ref: 'HealthState' }]
});

module.exports = mongoose.model('Animaux', AnimalSchema);