const express = require('express');
const router = express.Router();
const UserController = require('../../Controller/Authentification/Agriculteur');
router.get('/user',UserController.getAgriculteur);
router.post('/',UserController.postAgriculteur);
router.post('/mot-de-passe-oublie',UserController.MotDePasseOublie);
router.get('/nbAgriculteursParGouvernaurat',UserController.getNombreAgriculteursParGouvernorat);
module.exports = router;