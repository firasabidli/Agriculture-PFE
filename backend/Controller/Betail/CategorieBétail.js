const Categorie = require('../../Model/Betail/CategorieBetail');

// Créer une nouvelle catégorie
exports.create = async (req, res) => {
  try {
    const categorie = await Categorie.create(req.body);
    res.status(201).json({ success: true, message: 'Categorie Betail ajouté avec succés', data: categorie });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Récupérer toutes les catégories
exports.all = async (req, res) => {
  
    Categorie.find().populate('betails')
    .then(Categories => res.status(200).json(Categories))
      .catch(err => res.status(400).json({error: err.message}));
  
};

// Récupérer une catégorie par son ID
exports.getCategorieById = async (req, res) => {
  try {
    const categorie = await Categorie.findById(req.params.id).populate('betails');
    if (!categorie) {
      return res.status(404).json({ success: false, message: "Categorie betail n'est pas trouvé" });
    }
    res.status(200).json({ success: true, data: categorie });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Mettre à jour une catégorie par son ID
exports.update = async (req, res) => {
  try {
    const categorie = await Categorie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!categorie) {
      return res.status(404).json({ success: false, message: "Categorie n'est pas trouve" });
    }
    res.status(200).json({ success: true, message: 'Categorie modifié avec  succés', data: categorie });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Supprimer une catégorie par son ID
exports.delete = async (req, res) => {
  try {
    const categorie = await Categorie.findByIdAndDelete(req.params.id);
    if (!categorie) {
      return res.status(404).json({ success: false, message: "Categorie n'est pas trouvé"});
    }
    res.status(200).json({ success: true, message: 'Categorie supprimé avec succés' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Récupérer les races pour une catégorie spécifique
exports.getRaces = async (req, res) => {
  try {
    const categorie = await Categorie.findById(req.params.id).populate('betails');
    if (!categorie) {
      return res.status(404).json({ success: false, message: "Categorie n'est pas trouver" });
    }
    res.status(200).json({ success: true, data: categorie.races });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};