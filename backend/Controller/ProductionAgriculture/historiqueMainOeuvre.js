const MainOeuvre= require('../../Model/ProductionAgriculture/historiqueMainOeuvre');
// ajouter
exports.create= async(req,res)=>{
   
    try {
        const agriculteurId = req.userId;
        const newData = {
          Agriculteur: agriculteurId,
          ...req.body,
        };
    // console.log(newData);
        const newState = new MainOeuvre(newData);
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
        const States = await MainOeuvre.find({ idCulture: cultureId });
    
        if (!States || States.length === 0) {
          return res.status(404).json({ message: 'Aucune donnée  trouvée pour cet culture.' });
        }
    
        res.status(200).json(States);
      } catch (error) {
        console.error('Erreur lors de la récupération des données d MainOeuvre par culture :', error);
        res.status(500).json({ message: 'Erreur lors de la récupération des données.' });
      }
    };
//delete
exports.delete=async(req,res)=>{
  try {
    const id = req.params.id;
    const deletedItem = await MainOeuvre.findByIdAndDelete(id);
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
console.log(updateData)
  try {
    const updatedData = await MainOeuvre.findByIdAndUpdate(id, updateData, { new: true });

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
    const MainOeuvres = await MainOeuvre.findById(req.params.id);
    if (!MainOeuvres) {
      return res.status(404).json({ success: false, message: "culture n'est pas trouvé" });
    }
    res.status(200).json({MainOeuvres});
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};