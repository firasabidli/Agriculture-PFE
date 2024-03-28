const mongoose = require('mongoose');
const MaterielSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image_materiel: { type: String, required: true },
    Agricultures: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Agriculture' }]
});

const Materiel = mongoose.model('Materiel', MaterielSchema);
module.exports = Materiel;