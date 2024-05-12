const express = require('express');
const router = express.Router();
const UserController = require('../../Controller/Authentification/Authentification');
router.post('/CreateCompte', UserController.create);
router.post('/Login', UserController.login)
router.post('/logout', UserController.logout);
router.get('/',UserController.get);
router.get('/:id',UserController.getUserId);
router.put('/ImageAdmin/:id',UserController.updateImageAdmin);
router.get('/verify',UserController.verifyAuthToken);
module.exports = router;
