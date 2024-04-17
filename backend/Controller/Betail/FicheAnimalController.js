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
    res.status(500).json({ message: 'Erreur lors de la création de la fiche d\'animal.' });
  }
};
