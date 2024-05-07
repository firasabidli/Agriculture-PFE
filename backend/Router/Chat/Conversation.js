const express = require('express');
const router = express.Router();
const conversationController = require('../../Controller/Chat/Conversations');

// Créer une nouvelle conversation
router.post("/", conversationController.createNewConversations);

// Obtenir les conversations d'un utilisateur
router.get("/:userId/:userRole", conversationController.getConversationsByUserId);

// Route pour obtenir la conversation entre deux utilisateurs
router.get("/find/:firstUserId/:secondUserId", conversationController.getConversationByUserIds);

module.exports = router;
