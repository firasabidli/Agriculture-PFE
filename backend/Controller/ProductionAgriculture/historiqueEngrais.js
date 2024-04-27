const Engrais= require('../../Model/ProductionAgriculture/historiqueEngrais');
// ajouter
exports.create= async(req,res)=>{
   
    try {
        const agriculteurId = req.userId;
        const newData = {
          Agriculteur: agriculteurId,
          ...req.body, 
        };
    
        const newState = new Engrais(newData);
        const savedState = await newState.save();
    
        res.status(201).json(savedState);
      } catch (error) {
        console.error('Erreur lors de l\'enregistrement de engais :', error);
        res.status(500).json({ message: 'Erreur lors de l\'enregistrement de engrais.' });
      }
    }
//Affiche
exports.get = async (req, res) => {
      try {
        const cultureId = req.params.id;
        const States = await Engrais.find({ idCulture: cultureId });
    
        if (!States || States.length === 0) {
          return res.status(404).json({ message: 'Aucune donnée  trouvée pour cet culture.' });
        }
    
        res.status(200).json(States);
      } catch (error) {
        console.error('Erreur lors de la récupération des données de engrais par culture :', error);
        res.status(500).json({ message: 'Erreur lors de la récupération des données de engrais.' });
      }
    };
//delete
exports.delete=async(req,res)=>{
  try {
    const id = req.params.id;
    const deletedItem = await Engrais.findByIdAndDelete(id);
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
    const updatedData = await Engrais.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedData) {
      return res.status(404).json({ message: "Données  non trouvées" });
    }

    res.status(200).json(updatedData);
  } catch (error) {
    console.error("Erreur lors de la mise à jour des données de santé :", error);
    res.status(500).json({ message: "Erreur lors de la mise à jour des données de santé" });
  }
};
exports.getById = async (req, res) => {
  try {
    const engrais = await Engrais.findById(req.params.id);
    if (!engrais) {
      return res.status(404).json({ success: false, message: 'culture n est pas trouver' });
    }
    res.status(200).json({engrais});
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};