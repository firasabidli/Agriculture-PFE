const mongoose = require('mongoose');
const StockSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image_MethodStock: { type: String, required: true },
  description: { type: String, required: true },
  Agricultures: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Agriculture' }],
  CategorieAgriculture:[{ type: mongoose.Schema.Types.ObjectId, ref: 'CategorieAgriculture' }]
});

const MethodeStockModel = mongoose.model('MethodeStock', StockSchema);
module.exports = MethodeStockModel;