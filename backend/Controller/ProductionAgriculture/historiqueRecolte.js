const Recolte= require('../../Model/ProductionAgriculture/historiqueRecolte');
// const FicheAgriculture = require('../../Model/');
const FicheAgriculture= require('../../Model/ProductionAgriculture/FicheAgriculture')
exports.getRecoltesByAgriculteur = async (req, res) => {
    try {
        const agriculteurId = req.params.agriculteurId;
        const fiches = await FicheAgriculture.find({ Agriculteur: agriculteurId }).select('_id');
        const ficheIds = fiches.map(fiche => fiche._id);
        
        const recoltes = await Recolte.find({ idCulture: { $in: ficheIds } }).populate('idCulture').exec();
        res.status(200).json(recoltes);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des récoltes', error });
    }
};
// ajouter
exports.create= async(req,res)=>{
   
    try {
        const agriculteurId = req.userId;
        const newData = {
          Agriculteur: agriculteurId,
          ...req.body,
        };
     //console.log(newData);
        const newState = new Recolte(newData);
        const savedState = await newState.save();
    
        res.status(201).json(savedState);
      } catch (error) {
        console.error('Erreur lors de l\'enregistrement  :', error);
        res.status(500).json({ message: 'Erreur lors de l\'enregistrement.' });
      }
    }
//Affiche
exports.get = async (req, res) => {
      try {
        const cultureId = req.params.id;
        const States = await Recolte.find({ idCulture: cultureId });
    
        if (!States || States.length === 0) {
          return res.status(404).json({ message: 'Aucune donnée  trouvée pour cet culture.' });
        }
    
        res.status(200).json(States);
      } catch (error) {
        console.error('Erreur lors de la récupération des données d Recolte par culture :', error);
        res.status(500).json({ message: 'Erreur lors de la récupération des données.' });
      }
    };
//delete
exports.delete=async(req,res)=>{
  try {
    const id = req.params.id;
    const deletedItem = await Recolte.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ message: 'L\'élément à supprimer est introuvable.' });
    }
    res.status(200).json({ message: 'L\'élément a été supprimé avec succès.' });
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'élément :', error);
    res.status(500).json({ message: 'Erreur lors de la suppression de l\'élément.' });
  }
};
//update
exports.update = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
//console.log(updateData)
  try {
    const updatedData = await Recolte.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedData) {
      return res.status(404).json({ message: "Données  non trouvées" });
    }

    res.status(200).json(updatedData);
  } catch (error) {
    console.error("Erreur lors de la mise à jour des données  :", error);
    res.status(500).json({ message: "Erreur lors de la mise à jour des données " });
  }
};
exports.getById = async (req, res) => {
  try {
    const Recoltes = await Recolte.findById(req.params.id);
    if (!Recoltes) {
      return res.status(404).json({ success: false, message: "culture n'est pas trouver" });
    }
    res.status(200).json({Recoltes});
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
//
