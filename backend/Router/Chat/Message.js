const express = require('express');
const router = express.Router();
const messageController = require('../../Controller/Chat/MessageController');
const authenticateUser= require('../../Controller/Authentification/authenticateUser');
// Envoyer un nouveau message
router.post('/', messageController.sendMessage);

// Obtenir les messages d'une conversation
router.get('/:conversationId/:senderId/:receiptId',messageController.getMessages);

module.exports = router;
