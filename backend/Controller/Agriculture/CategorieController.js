const Categorie = require('../../Model/Agriculture/CategorieModel');
const Agriculture=require('../../Model/Agriculture/Agriculture')
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
    const categories = await Categorie.find().populate('Agricultures');
    res.status(200).json( { success: true, data: categories } );
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Récupérer une catégorie par son ID
exports.getCategorieById = async (req, res) => {
  try {
    const categorie = await Categorie.findById(req.params.id).populate('Agricultures');;
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
exports.search = async (req, res) => {
  try {
    const query = req.query.q;
    // Recherche dans la base de données en utilisant une expression régulière pour rechercher dans le nom
    const results = await Categorie.find({ name: { $regex: query, $options: 'i' } });
    res.json(results);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};