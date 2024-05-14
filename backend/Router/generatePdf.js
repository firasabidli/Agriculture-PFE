const express = require('express');
const router = express.Router();
const pdfController = require('../Controller/generatePdf');


// Récupérer toutes les catégories
router.post('/', pdfController.postPDF);
//router.post('/Download',pdfController.DownloadPDF)


module.exports = router;
