const mongoose = require('mongoose');

const RemarqueSchema = new mongoose.Schema({
    nom_culture:{ type: String, required: true },
    option_Remarque: { type: String, required: true },
    Remarque:{ type: String, required: true },
    date_enregistrement: {
        type: Date,
        default: Date.now 
      }
});

module.exports = mongoose.model('RemarqueAgriculture', RemarqueSchema);