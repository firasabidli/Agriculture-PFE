const express = require('express');
const router = express.Router();
const RemarqueController = require('../../Controller/Agriculture/RemarqueAgriculture');
router.post('/',RemarqueController.create );
module.exports = router;