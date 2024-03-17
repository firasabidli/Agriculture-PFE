const mongoose = require('mongoose');
const StockSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image_MethodStock: { type: String, required: true },
  description: { type: String, required: true },
});

const MethodeStockModel = mongoose.model('MethodeStock', StockSchema);
module.exports = MethodeStockModel;