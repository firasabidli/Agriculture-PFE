const express = require('express');
const router = express.Router();
const SaisonController = require('../../Controller/Agriculture/SaisonController')

router.get ('/', SaisonController.all);

module.exports = router;