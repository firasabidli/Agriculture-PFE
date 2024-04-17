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