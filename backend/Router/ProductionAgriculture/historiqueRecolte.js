const express = require('express');
const router = express.Router();
const Controller = require('../../Controller/ProductionAgriculture/historiqueRecolte');
const authenticateUser= require('../../Controller/Authentification/authenticateUser');
router.post('/', authenticateUser,Controller.create);
router.get('/:id',Controller.get);
router.delete('/:id',Controller.delete);
router.put('/:id',Controller.update);
router.get('/recolte/:id',Controller.getById);

module.exports = router;