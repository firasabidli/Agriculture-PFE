const express = require('express');
const router = express.Router();
const categorieBetailController = require('../../Controller/Betail/CategorieBétail');
router.post('/', categorieBetailController.create);

// Récupérer toutes les catégories
router.get('/', categorieBetailController.all);

// Récupérer une catégorie par son ID
router.get('/:id', categorieBetailController.getCategorieById);

// Mettre à jour une catégorie par son ID
router.put('/modifier/:id', categorieBetailController.update);

// Supprimer une catégorie par son ID
router.delete('/delete/:id', categorieBetailController.delete);
router.get('/categories/races/:id', categorieBetailController.getRaces);
module.exports = router;