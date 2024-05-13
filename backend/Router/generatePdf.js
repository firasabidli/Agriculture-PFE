const express = require('express');
const router = express.Router();
const pdfController = require('../Controller/generatePdf');


// Récupérer toutes les catégories
router.post('/', pdfController.postPDF);



module.exports = router;
