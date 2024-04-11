const express = require('express');
const router = express.Router();
const ActiverCompteController = require('../../Controller/Authentification/ActiverCompteController');


router.get('/', ActiverCompteController.all);
router.put('/Activer/:id', ActiverCompteController.activer);
router.delete('/Refuser/:id', ActiverCompteController.refuser);

module.exports = router;
