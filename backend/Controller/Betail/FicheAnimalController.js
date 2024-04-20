const Animal = require('../../Model/Betail/FicheAnimal');

exports.create = async (req, res) => {
  try {
    const { categorieBetail,subCategorieBetail, Race, date_naissance, IdantifiantsAnimal, sexe } = req.body;
    const agriculteurId = req.userId;
console.log("agri",agriculteurId)
    //Vérification des champs obligatoires
    if (!categorieBetail||!subCategorieBetail || !Race || !date_naissance || !IdantifiantsAnimal || !sexe) {
      return res.status(400).json({ error: 'Veuillez fournir toutes les informations requises.' });
    }

    const nouvelAnimal = new Animal({
      Agriculteur:agriculteurId,
      categorieBetail,
      subCategorieBetail,
      Race,
      date_naissance,
      IdantifiantsAnimal,
      sexe,
    });

    const animalEnregistre = await nouvelAnimal.save();
    res.status(201).json({ message: 'Animal enregistré avec succès.', animal: animalEnregistre });
  } catch (error) {
    console.error('Erreur lors de la création de la fiche d\'animal :', error);
  }
};
exports.getAnimauxByAgriculteur = async (req, res) => {
  try {
    // Récupérez l'identifiant de l'agriculteur connecté à partir de la requête (supposons qu'il soit stocké dans req.userId)
    const agriculteurId = req.userId;

    // Récupérez les animaux associés à cet agriculteur depuis la base de données
    const animaux = await Animal.find({ Agriculteur: agriculteurId });

    // Répondez avec les animaux trouvés
    res.status(200).json(animaux);
  } catch (error) {
    console.error('Erreur lors de la récupération des animaux de l\'agriculteur :', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des animaux de l\'agriculteur.' });
  }
};
exports.all = async (req, res) => {
  
  Animal.find()
  .then(Animals => res.status(200).json(Animals))
    .catch(err => res.status(400).json({error: err.message}));

};
exports.delete = async (req,res)=>{
  const animalId = req.params.id;

  try {
    const deletedAnimal = await Animal.findByIdAndDelete(animalId);
    if (!deletedAnimal) {
      return res.status(404).json({ error: 'Animal n est pas trouver' });
    }
    res.status(200).json({ message: 'Animal supprimer avec succés' });
  } catch (error) {
    console.error('Error deleting animal:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
exports.update = async (req, res) => {
  const animalId = req.params.id;
  console.log('Request Body:', req.body);

  const { categorieBetail, subCategorieBetail, Race, date_naissance, IdantifiantsAnimal, sexe } = req.body;

  console.log('categorieBetail:', categorieBetail);
  console.log('subCategorieBetail:', subCategorieBetail);
  console.log('Race:', Race);
  console.log('date_naissance:', date_naissance);
  console.log('IdantifiantsAnimal:', IdantifiantsAnimal);
  console.log('sexe:', sexe);
  
  try {
    // Construct the updatedData object based on the fields received in the request body
    const updatedData = {
      categorieBetail,
      subCategorieBetail,
      Race,
      date_naissance,
      IdantifiantsAnimal,
      sexe
    };

    console.log('Updated data:', updatedData);
    //const updated = await Animal.findByIdAndUpdate(req.params.id,updatedData, { new: true });
    // Use Mongoose's updateOne method to update the animal document
    const result = await Animal.updateOne({ _id: animalId }, { $set: updatedData });

    if (result.nModified === 0) {
      return res.status(404).json({ error: 'Animal not found or no changes made' });
    }

    res.status(200).json({ message: 'Animal updated successfully' });
  } catch (error) {
    console.error('Error updating animal:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
exports.getbetailById = async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.id);
    if (!animal) {
      return res.status(404).json({ success: false, message: 'animal n est pas trouver' });
    }
    res.status(200).json({animal});
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};