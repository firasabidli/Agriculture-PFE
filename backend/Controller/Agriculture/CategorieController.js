const Categorie = require('../../Model/Agriculture/CategorieModel');
const Materiel = require('../../Model/Agriculture/MaterielModel');
const MethodeStock = require('../../Model/Agriculture/MethodeStock');
const Medicament = require('../../Model/Agriculture/Medicament');
// Créer une nouvelle catégorie
exports.create = async (req, res) => {
  const {
    nom_categorie,
    description,
    Equipements,
    MethodeStockage,
    Engrais,
  } = req.body;
  
  try {
    const categorie = await Categorie.create({
      nom_categorie,
      description,
      Equipements,
      MethodeStockage,
      Engrais,
    });

    await Materiel.updateMany({ '_id': categorie.Equipements }, { $push: { CategorieAgriculture: categorie._id } });
    await MethodeStock.updateMany({ '_id': categorie.MethodeStockage }, { $push: { CategorieAgriculture: categorie._id } });
    await Medicament.updateMany({ '_id': categorie.Engrais }, { $push: { CategorieAgriculture: categorie._id } });
  
    
    res.status(201).json({ success: true, message: 'Catégorie créée avec succès', data: categorie });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};


// Récupérer toutes les catégories
exports.all = async (req, res) => {
  try {
    const categories = await Categorie.find().populate('Agricultures Equipements MethodeStockage Engrais');
    res.status(200).json( { success: true, data: categories } );
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Récupérer une catégorie par son ID
exports.getCategorieById = async (req, res) => {
  try {
    const categorie = await Categorie.findById(req.params.id).populate('Agricultures Equipements MethodeStockage Engrais');;
    if (!categorie) {
      return res.status(404).json({ success: false, message: "Categorie n'est pas trouver" });
    }
    res.status(200).json({ success: true, data: categorie });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Mettre à jour une catégorie par son ID
exports.update = async (req, res) => {
  try {
    const {
      nom_categorie,
      description,
      Equipements,
      MethodeStockage,
      Engrais,
    } = req.body;

    let updateData = {
      nom_categorie,
      description,
      Equipements,
      MethodeStockage,
      Engrais,
    };
    const updatedCategorie = await Categorie.findByIdAndUpdate(req.params.id, updateData, { new: true });
    
    if (!updatedCategorie) {
      return res.status(404).json({ success: false, message: 'Categorie ne trouve pas' });
    }
    await Materiel.updateMany({}, { $pull: { CategorieAgriculture: updatedCategorie._id } });
    await MethodeStock.updateMany({}, { $pull: { CategorieAgriculture: updatedCategorie._id } });
    await Medicament.updateMany({}, { $pull: { CategorieAgriculture: updatedCategorie._id } });
    await Materiel.updateMany({ '_id': { $in: Equipements } }, { $addToSet: { CategorieAgriculture: updatedCategorie._id } });
    await MethodeStock.updateMany({ '_id': { $in: MethodeStockage } }, { $addToSet: { CategorieAgriculture: updatedCategorie._id } });
    await Medicament.updateMany({ '_id': { $in: Engrais } }, { $addToSet: { CategorieAgriculture: updatedCategorie._id } });
    res.status(200).json({ success: true, message: 'Categorie modifier', data: updatedCategorie });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Supprimer une catégorie par son ID
exports.delete = async (req, res) => {
  try {
    const categorie = await Categorie.findByIdAndDelete(req.params.id);
    if (!categorie) {
      return res.status(404).json({ success: false, message: 'Categorie ne trouve pas' });
    }
    await Materiel.updateMany({}, { $pull: { CategorieAgriculture: categorie._id } });
    await MethodeStock.updateMany({}, { $pull: { CategorieAgriculture: categorie._id } });
    await Medicament.updateMany({}, { $pull: { CategorieAgriculture: categorie._id } });
    res.status(200).json({ success: true, message: 'Categorie supprimer avec succées' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
//rechercher
exports.search = async (req, res) => {
  try {
    const query = req.query.q;
    // Recherche dans la base de données 
    const results = await Categorie.find({ name: { $regex: query, $options: 'i' } });
    res.json(results);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};