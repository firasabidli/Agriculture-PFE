const SanteBetail = require('../../Model/Betail/SanteBetail');

// ajouter
exports.create= async(req,res)=>{

  try {
      const agriculteurId = req.userId;
      const newHealthStateData = {
        Agriculteur: agriculteurId,
        ...req.body, 
      };
  
      const newHealthState = new SanteBetail(newHealthStateData);
      const savedHealthState = await newHealthState.save();
  
      res.status(201).json(savedHealthState);
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement de l\'état de santé :', error);
      res.status(500).json({ message: 'Erreur lors de l\'enregistrement de l\'état de santé.' });
    }
  }
  exports.getAnimal = async (req, res) => {
    try {
      const animalId = req.params.id;
      const healthStates = await SanteBetail.find({ AnimalId: animalId }).populate('AnimalId');
  
      if (!healthStates || healthStates.length === 0) {
        return res.status(404).json({ message: 'Aucune donnée de santé trouvée pour cet animal.' });
      }
  
      res.status(200).json(healthStates);
    } catch (error) {
      console.error('Erreur lors de la récupération des données de santé par animal :', error);
      res.status(500).json({ message: 'Erreur lors de la récupération des données de santé.' });
    }
  };
// supprimer
exports.delete=async(req,res)=>{
  try {
    const id = req.params.id;
    const deletedItem = await SanteBetail.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ message: 'L\'élément à supprimer est introuvable.' });
    }
    res.status(200).json({ message: 'L\'élément a été supprimé avec succès.' });
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'élément :', error);
    res.status(500).json({ message: 'Erreur lors de la suppression de l\'élément.' });
  }
};
//modifier
exports.update = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body; // Les données mises à jour sont envoyées dans le corps de la requête

  try {
    const updatedHealthData = await SanteBetail.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedHealthData) {
      return res.status(404).json({ message: "Données de santé non trouvées" });
    }

    res.status(200).json(updatedHealthData);
  } catch (error) {
    console.error("Erreur lors de la mise à jour des données de santé :", error);
    res.status(500).json({ message: "Erreur lors de la mise à jour des données de santé" });
  }
}
// trouver etat du santer selon id animal
exports.getSanteById = async (req, res) => {
  try {
    const sante = await SanteBetail.findById(req.params.id);
    if (!sante) {
      return res.status(404).json({ success: false, message: "animal n'est pas trouvé" });
    }
    res.status(200).json({sante});
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};