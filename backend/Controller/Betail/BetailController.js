const Betail = require('../../Model/Betail/BetailModel');
const CategorieBetail = require('../../Model/Betail/CategorieBetail');
const fs = require('fs');

//create Betail
exports.create = async (req, res) => {
  const {
    nom_betail,
    race,
    sexe,
    alimentation,
    quantite_aliment_par_jour_kg,
    frequence_suivi_sante,
    commentaires_sante,
    etat_betail,
    id_categorie, 
  } = req.body;

  const imageName = req.file.filename;

  try {
    const newBetail = await Betail.create({
        nom_betail,
        race,
        sexe,
        alimentation,
        image_betail: imageName,
        quantite_aliment_par_jour_kg,
        frequence_suivi_sante,
        commentaires_sante,
        etat_betail,
        id_categorie: id_categorie,
      
      
    });
    
    await CategorieBetail.updateMany({ '_id': newBetail.id_categorie }, { $push: { betails: newBetail._id } });
    res.json({ success: true, message: 'Betail enregistré avec succés', data: newBetail });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


exports.all = async (req, res) => {
    try {
      const Betails = await Betail.find().populate('id_categorie');
      const BetailsWithImagePaths = Betails.map(betail => ({
        ...betail._doc,
        image_betail: betail.image_betail ? `http://localhost:3001/images/Betails/${betail.image_betail}` : null // Ajouter le chemin d'accès complet au dossier images
      }));
      res.status(200).json({ success: true, data: BetailsWithImagePaths });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

// Récupérer  Betail par son ID
exports.getBetailById = async (req, res) => {
  try {
    const betail = await Betail.findById(req.params.id).populate('id_categorie');
    if (!betail) {
      return res.status(404).json({ success: false, message: 'Betail ne trouve pas' });
    }
    
    // Manipuler l'image de la betail pour inclure le chemin d'accès complet
    const BetailWithImagePaths = {
      ...betail._doc,
      image_betail: betail.image_betail ? `http://localhost:3001/images/Betails/${betail.image_betail}` : null
    };
    
    res.status(200).json({ success: true, data: BetailWithImagePaths });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};



// Mettre à jour betail par son ID
exports.update = async (req, res) => {
  try {
    const {
      nom_betail,
      race,
      sexe,
      alimentation,
      quantite_aliment_par_jour_kg,
      frequence_suivi_sante,
      commentaires_sante,
      etat_betail,
      id_categorie,  } = req.body;

    let updateData = {
      nom_betail,
      race,
      sexe,
      alimentation,
      quantite_aliment_par_jour_kg,
      frequence_suivi_sante,
      commentaires_sante,
      etat_betail,
      id_categorie: id_categorie,
      
    };
    
     // Vérifiez si une nouvelle image est téléchargée
    if (req.file) {
      // Supprimez l'ancienne image
      const betail = await Betail.findById(req.params.id);
      if (betail) {
        const imagePath = `src/assets/images/Betails/${betail.image_betail}`;
        fs.unlinkSync(imagePath);
      }

      // Mettez à jour le nom de l'image dans la base de données
      const imageName = req.file.filename;
      updateData.image_betail = imageName;
    }

    const updatedBetail = await Betail.findByIdAndUpdate(req.params.id, updateData, { new: true });

    if (!updatedBetail) {
      return res.status(404).json({ success: false, message: 'Betail ne trouve pas' });
    }
    // Retirer la betail mise à jour de categorie
    
    await CategorieBetail.updateMany({}, { $pull: { betails: updatedBetail._id } });
    // Ajouter la nouvelle betail au nouveau categorie
    
    await CategorieBetail.updateMany({ '_id': { $in: id_categorie } }, { $addToSet: { betails: updatedBetail._id } });

    res.status(200).json({ success: true,message: 'Betail modifiée avec succés', data: updatedBetail });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Supprimer une Betail par son ID

exports.delete = async (req, res) => {
  try {
    const betail = await Betail.findByIdAndDelete(req.params.id);
    if (!betail) {
      return res.status(404).json({ success: false, message: 'Betail ne trouve pas' });
    }
    
    // Supprimer l'image associée
    const imagePath = `src/assets/images/Betails/${betail.image_betail}`;
    fs.unlinkSync(imagePath);

    // Supprimer l'ID de la betail de categorie
    
    await CategorieBetail.updateMany({}, { $pull: { betails: betail._id } });
    res.status(200).json({ success: true, message: 'Betail suppriméé avec succés' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

exports.categorieBetail = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const betails = await Betail.find({ id_categorie: categoryId }).populate('id_categorie');
    res.json(betails);
  } catch (error) {
    console.error('Erreur lors de la récupération des betails par catégorie :', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des betails par catégorie.' });
  }
};