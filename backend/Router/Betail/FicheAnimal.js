const express = require('express');
const router = express.Router();
const AnimalController = require('../../Controller/Betail/FicheAnimalController');
const authenticateUser= require('../../Controller/Authentification/authenticateUser');
router.post('/', authenticateUser,AnimalController.create);
router.get('/',authenticateUser,AnimalController.getAnimauxByAgriculteur);
router.get('/all',AnimalController.all);
module.exports = router;