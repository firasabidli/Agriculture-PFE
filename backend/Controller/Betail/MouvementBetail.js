const MouvementBetail = require('../../Model/Betail/Mouvement');

// ajouter mouvement
exports.create= async(req,res)=>{
   
        try {
            const agriculteurId = req.userId;
            const newMouvementStateData = {
              Agriculteur: agriculteurId,
              ...req.body, 
            };
        
            const newMouvementState = new MouvementBetail(newMouvementStateData);
            const savedMouvementState = await newMouvementState.save();
        
            res.status(201).json(savedMouvementState);
          } catch (error) {
            console.error('Erreur lors de l\'enregistrement de l\'état de santé :', error);
            res.status(500).json({ message: 'Erreur lors de l\'enregistrement de l\'état de santé.' });
          }
        }
        exports.getAnimal = async (req, res) => {
          try {
            const animalId = req.params.id; 
            const Mouvements = await MouvementBetail.find({ AnimalId: animalId }); 
        
            if (!Mouvements||Mouvements.length === 0) {
              return res.status(404).json({ message: 'Aucune donnée de Mouvement trouvée pour cet animal.' });
            }
        
            res.status(200).json(Mouvements); 
          } catch (error) {
            console.error('Erreur lors de la récupération des données de mouvement par animal :', error);
            res.status(500).json({ message: 'Erreur lors de la récupération des données de mouvement.' });
          }
        };
// supprimer mouvement
exports.delete=async(req,res)=>{
  try {
    const id = req.params.id;
    const deletedItem = await MouvementBetail.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ message: 'L\'élément à supprimer est introuvable.' });
    }
    res.status(200).json({ message: 'L\'élément a été supprimé avec succès.' });
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'élément :', error);
    res.status(500).json({ message: 'Erreur lors de la suppression de l\'élément.' });
  }
};
// modifier
exports.update = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body; // Les données mises à jour sont envoyées dans le corps de la requête

  try {
    const updatedMouvementData = await MouvementBetail.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedMouvementData) {
      return res.status(404).json({ message: "Données de mouvement non trouvées" });
    }

    res.status(200).json(updatedMouvementData);
  } catch (error) {
    console.error("Erreur lors de la mise à jour des données de mouvement :", error);
    res.status(500).json({ message: "Erreur lors de la mise à jour des données de mouvement" });
  }
}

// afficher mouvement selon id
exports.getMouvementById = async (req, res) => {
  try {
    const mouvement = await MouvementBetail.findById(req.params.id);
    if (!mouvement) {
      return res.status(404).json({ success: false, message: "animal n'est pas trouvé" });
    }
    res.status(200).json({mouvement});
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};