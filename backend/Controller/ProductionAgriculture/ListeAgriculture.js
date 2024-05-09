const culture = require('../../Model/ProductionAgriculture/FicheAgriculture');
const Recolte= require('../../Model/ProductionAgriculture/historiqueRecolte');
exports.create = async (req, res) => {
  try {
    const { titre, surface, categorie, description, localisation, quantiteSemences, datePlantation, prixSemence, prixTerrain } = req.body;
    const agriculteurId = req.userId;
    
    // Vérification des champs obligatoires
    if (!titre || !surface || !categorie || !description || !localisation || !quantiteSemences || !datePlantation || !prixSemence || !prixTerrain) {
      return res.status(400).json({ error: 'Veuillez fournir toutes les informations requises.' });
    }

    // Création d'une nouvelle fiche d'agriculture
    const nouvelleFiche = new culture({
      Agriculteur: agriculteurId,
      titre,
      surface,
      categorie,
      description,
      localisation,
      quantiteSemences,
      datePlantation,
      prixSemence,
      prixTerrain
    });

    const enregistrement = await nouvelleFiche.save();

    res.status(201).json({ message: 'Votre culture a été enregistrée avec succès.', culture: enregistrement });
  } catch (error) {
    console.error('Erreur lors de la création de la fiche d\'agriculture :', error);
    res.status(500).json({ error: 'Une erreur est survenue lors de la création de la fiche d\'agriculture.' });
  }
};
exports.getAgricultureByAgriculteur = async (req, res) => {
    try {
      const agriculteurId = req.userId;
      const agriculture = await culture.find({ Agriculteur: agriculteurId });
      res.status(200).json(agriculture);
    } catch (error) {
      console.error('Erreur lors de la récupération des agriculture de l\'agriculteur :', error);
      res.status(500).json({ message: 'Erreur lors de la récupération des cultures de l\'agriculteur.' });
    }
  };
exports.all = async (req, res) => {
    culture.find()
    .then(cultures => res.status(200).json(cultures))
      .catch(err => res.status(400).json({error: err.message}));
  };
exports.delete = async (req,res)=>{
    const cultureId = req.params.id;
  
    try {
      const deleted = await culture.findByIdAndDelete(cultureId);
      if (!deleted) {
        return res.status(404).json({ error: "Agriculture n'est pas trouvé" });
      }
      res.status(200).json({ message: 'Agriculture supprimer avec succés' });
    } catch (error) {
      console.error('Error deleting agriculture:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
exports.getById = async (req, res) => {
  try {
    const cultures = await culture.findById(req.params.id);
    if (!cultures) {
      return res.status(404).json({ success: false, message: "culture n'est pas trouvé" });
    }
    res.status(200).json({cultures});
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
exports.update = async (req, res) => {
  const agricultureId = req.params.id;
  const { titre, surface, categorie, description, localisation, quantiteSemences, datePlantation, prixSemence, prixTerrain } = req.body;

  try {
      const updatedData = {
          titre,
          surface,
          categorie,
          description,
          localisation,
          quantiteSemences,
          datePlantation,
          prixSemence,
          prixTerrain
      };

      const result = await culture.updateOne({ _id: agricultureId }, updatedData);
      if (result.nModified === 0) {
          return res.status(404).json({ error: 'Agriculture ne trouve pas ou auccun changement apporté' });
      }
      res.status(200).json({ message: 'Agriculture modifié avec succés' });
  } catch (error) {
      console.error('Error updating agriculture:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
};
  //
  exports.getRecoltesByAgriculteur = async (req, res) => {
    console.log("recoltesByAgriculteur");
    try {
      const agriculteurId = req.userId;
      const cultures = await culture.find({ Agriculteur: agriculteurId });
      const recoltesByAgriculteur = await Promise.all(cultures.map(async (culture) => {
          const recoltes = await Recolte.find({ idCulture: culture._id });
          return { culture, recoltes };
      }));
      //console.log(recoltesByAgriculteur);
      res.status(200).json(recoltesByAgriculteur);
  } catch (error) {
      console.error('Erreur lors de la récupération des récoltes par agriculteur :', error);
      res.status(500).json({ message: 'Erreur lors de la récupération des récoltes.' });
  }

  }  