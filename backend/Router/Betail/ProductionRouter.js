const express = require('express');
const router = express.Router();
const ProductionController = require('../../Controller/Betail/ProductionController');

router.post('/', ProductionController.create);
router.get('/:idAgriculteur/:idAnimal/:month/:year', ProductionController.getByMonthAndYear);
router.get('/:idAgriculteur/:idAnimal', ProductionController.all);
router.get('/stat/:idAgriculteur/:idAnimal/:year/:month', ProductionController.StatLitirarire);
router.get('/Rapport/:idAgriculteur/:idAnimal/:month/:year', ProductionController.getDailyProduction);
router.get('/stat/Rapport/:idAgriculteur/:idAnimal/:year/:month', ProductionController.getWeeklyStats);
router.put('/:idProduction/:idJour', ProductionController.update);
module.exports = router;
