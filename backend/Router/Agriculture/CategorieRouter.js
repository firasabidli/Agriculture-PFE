// routes/Categorie.js
const express = require('express');
const router = express.Router();
const categorieController = require('../../Controller/Agriculture/CategorieController');
// Créer une nouvelle catégorie
router.post('/', categorieController.create);

// Récupérer toutes les catégories
router.get('/', categorieController.all);

// Récupérer une catégorie par son ID
router.get('/:id', categorieController.getCategorieById);

// Mettre à jour une catégorie par son ID
router.put('/:id', categorieController.update);

// Supprimer une catégorie par son ID
router.delete('/:id', categorieController.delete);

module.exports = router;
