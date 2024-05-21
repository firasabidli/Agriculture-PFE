const express = require('express');
const router = express.Router();
const Controller = require('../../Controller/ProductionAgriculture/PrévisionFinanciére');
const authenticateUser= require('../../Controller/Authentification/authenticateUser');
// router.get('/Calcule/:idAgriculteur',Controller.calculateGains)
// router.get('/predict/:idAgriculteur',Controller.predictRevenu)
router.get('/calculateAndPredict/:idAgriculteur', Controller.calculateAndPredict);

module.exports = router;