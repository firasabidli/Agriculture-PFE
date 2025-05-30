const express = require('express');
const router = express.Router();
const RemarqueController = require('../../Controller/Agriculture/RemarqueAgriculture');
router.post('/',RemarqueController.create );
router.put('/:id',RemarqueController.update);
router.post('/Reponse',RemarqueController.createResponse);
router.get('/',RemarqueController.getByDate);
router.delete('/:id',RemarqueController.delete);
module.exports = router;