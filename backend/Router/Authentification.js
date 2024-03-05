const express = require('express');
const router = express.Router();
const UserController = require('../Controller/Authentification')
router.post('/CreateCompte', UserController.create);

module.exports = router;