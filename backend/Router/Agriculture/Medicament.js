const express = require('express');
const router = express.Router();
const MedicamentController = require('../../Controller/Agriculture/Medicament')
router.post('/AjouterMedicament', MedicamentController.createMedicament);
router.get ('/ListMedicament', MedicamentController.getMedicament);
router.put('/UpdateMedicament/:id', MedicamentController.updateMedicament);
router.delete('/delete/:id', MedicamentController.deleteMedicament);
//router.post('/upload-image', MedicamentController.uploadImage);
module.exports = router;