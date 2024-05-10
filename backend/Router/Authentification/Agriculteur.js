const express = require('express');
const router = express.Router();
const UserController = require('../../Controller/Authentification/Agriculteur');
router.get('/user',UserController.getAgriculteur)
router.post('/',UserController.postAgriculteur);
module.exports = router;