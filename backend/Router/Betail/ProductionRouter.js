const express = require('express');
const router = express.Router();
const ProductionController = require('../../Controller/Betail/ProductionController');

router.post('/', ProductionController.create);
router.get('/:idAgriculteur/:idAnimal/:month/:year', ProductionController.getByMonthAndYear);
router.delete('/:id', ProductionController.delete);
router.get('/:idAgriculteur', ProductionController.all);
router.get('/stat/:idAgriculteur/:idAnimal/:year/:month', ProductionController.StatLitirarire);

module.exports = router;
