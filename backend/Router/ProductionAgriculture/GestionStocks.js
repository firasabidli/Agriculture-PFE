const express = require('express');
const router = express.Router();
const Controller = require('../../Controller/ProductionAgriculture/GestionStocks');
const authenticateUser= require('../../Controller/Authentification/authenticateUser');
router.post('/', authenticateUser,Controller.create);
router.get('/',authenticateUser,Controller.getstockByAgriculteur);
router.delete('/:id',Controller.delete);
router.put('/:id',Controller.update);
router.get('/stock/:id',Controller.getById);

module.exports = router;