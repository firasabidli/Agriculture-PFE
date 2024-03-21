const mongoose = require('mongoose');
const MedicamentSchema = new mongoose.Schema({
  nomMedicament: { type: String, required: true },
  image: { type: String,required:true },
  description: { type: String, required: true },
});

const MedicamentCultureModel = mongoose.model('MedicamentCulture', MedicamentSchema);
module.exports = MedicamentCultureModel;