const AlimentsAnimal = require('../../Model/Betail/AlimentsAnimalModel');
// Ajouter données sur aliment d'un animal
exports.create = async (req, res) => {
  try {
    const alimentsAnimal = await AlimentsAnimal.create(req.body);
    res.status(201).json({ success: true, message: 'AlimentsAnimal ajouté avec succès', data: alimentsAnimal });
  } catch (err) {
    console.error('Erreur lors de la création de l\'aliment', err);
    res.status(400).json({ success: false, message: err.message });
  }
};
// afficher tout les données
exports.all = async (req, res) => {
  try {
    const { idAgriculteur, AnimalId } = req.params;
    const alimentsAnimals = await AlimentsAnimal.find({ idAgriculteur, AnimalId });
    res.status(200).json({ success: true, data: alimentsAnimals });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getCategorieById = async (req, res) => {
  try {
    const alimentsAnimal = await AlimentsAnimal.findById(req.params.id);
    if (!alimentsAnimal) {
      return res.status(404).json({ success: false, message: "AlimentsAnimal n'existe pas" });
    }
    res.status(200).json({ success: true, data: alimentsAnimal });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
// modifier
exports.update = async (req, res) => {
  try {
    const { dateAchat, quantite, unite, prix, total, aliments  } = req.body;

    let updateData = {
      dateAchat, quantite, unite, prix, total, aliments
    };
 
    await AlimentsAnimal.updateOne({ _id: req.params.id }, updateData);


    res.status(200).json({ success: true, message: 'Aliment modifier avec succées' });
  } catch (error) {
   
    res.status(500).json({ success: false, message: error.message });
  }
};

// supprimer
exports.delete = async (req, res) => {
  try {
    const alimentsAnimal = await AlimentsAnimal.findByIdAndDelete(req.params.id);
    if (!alimentsAnimal) {
      return res.status(404).json({ success: false, message: "AlimentsAnimal n'existe pas" });
    }
    res.status(200).json({ success: true, message: 'AlimentsAnimal supprimée avec succès' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
