const express = require('express');
const router = express.Router();
const MethodeStockController = require('../Controller/MethodeStock')
router.post('/AjouterStock', MethodeStockController.createStock);
router.get ('/ListStock', MethodeStockController.getStocks);
router.get('/StockId/:id', MethodeStockController.getStockById);

// Mettre à jour un stock par son ID
router.put('/UpdateStock/:id', MethodeStockController.updateStock);

// Supprimer un stock par son ID
router.delete('/deletStock/:id', MethodeStockController.deleteStock);
module.exports = router;