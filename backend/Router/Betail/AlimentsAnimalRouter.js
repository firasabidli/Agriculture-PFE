const express = require('express');
const router = express.Router();
const alimentsAnimalController = require('../../Controller/Betail/AlimentsAnimalController');

router.post('/', alimentsAnimalController.create);
router.get('/:idAgriculteur', alimentsAnimalController.all);
router.get('/:id', alimentsAnimalController.getCategorieById);
router.put('/:id', alimentsAnimalController.update);
router.delete('/:id', alimentsAnimalController.delete);
module.exports = router;
