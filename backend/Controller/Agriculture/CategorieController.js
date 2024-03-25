const Categorie = require('../../Model/Agriculture/CategorieModel');

// Créer une nouvelle catégorie
exports.create = async (req, res) => {
  try {
    const categorie = await Categorie.create(req.body);
    res.status(201).json({ success: true, message: 'Categorie created successfully', data: categorie });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Récupérer toutes les catégories
exports.all = async (req, res) => {
  try {
    const categories = await Categorie.find()
    res.status(200).json({ success: true, data: categories });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Récupérer une catégorie par son ID
exports.getCategorieById = async (req, res) => {
  try {
    const categorie = await Categorie.findById(req.params.id)
    if (!categorie) {
      return res.status(404).json({ success: false, message: 'Categorie not found' });
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
      return res.status(404).json({ success: false, message: 'Categorie not found' });
    }
    res.status(200).json({ success: true, message: 'Categorie updated successfully', data: categorie });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Supprimer une catégorie par son ID
exports.delete = async (req, res) => {
  try {
    const categorie = await Categorie.findByIdAndDelete(req.params.id);
    if (!categorie) {
      return res.status(404).json({ success: false, message: 'Categorie not found' });
    }
    res.status(200).json({ success: true, message: 'Categorie deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


