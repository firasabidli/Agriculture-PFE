const Materiel = require('../../Model/Agriculture/MaterielModel');
const fs = require('fs');

//create Materiel
exports.create = async (req, res) => {
  const { nom,description, } = req.body;

  const imageName = req.file.filename;

  try {
    
    const newMateriel = await Materiel.create({
      nom,
      description,
      image_materiel: imageName,
      
    });

    res.json({ success: true, message: 'Materiel created', data: newMateriel });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Récupérer toutes les Materiels
exports.all = async (req, res) => {
  try {
    const Materiels = await Materiel.find().populate('Agricultures');
    const MaterielsWithImagePaths = Materiels.map(Materiel => ({
      ...Materiel._doc,
      image_materiel: Materiel.image_materiel ? `http://localhost:3001/images/MaterielsAgriculture/${Materiel.image_materiel}` : null // Ajouter le chemin d'accès complet au dossier images
    }));
    res.status(200).json({ success: true, data: MaterielsWithImagePaths });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Récupérer une Materiel par son ID
exports.getMaterielById = async (req, res) => {
  try {
    const materiel = await Materiel.findById(req.params.id).populate('Agricultures');
    if (!materiel) {
      return res.status(404).json({ success: false, message: 'Materiel not found' });
    }
    res.status(200).json({ success: true, data: materiel });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Mettre à jour une Materiel par son ID

;


exports.update = async (req, res) => {
  try {
    const { nom, description } = req.body;

    let updateData = {
      nom,
      description,
    };

    // Vérifiez si une nouvelle image est téléchargée
    if (req.file) {
      // Supprimez l'ancienne image
      const oldMateriel = await Materiel.findById(req.params.id);
      if (oldMateriel) {
        const imagePath = `src/assets/images/MaterielsAgriculture/${oldMateriel.image_materiel}`;
        fs.unlinkSync(imagePath);
      }

      // Mettez à jour le nom de l'image dans la base de données
      const imageName = req.file.filename;
      updateData.image_materiel = imageName;
    }

    // Mettez à jour les données du matériel
    await Materiel.updateOne({ _id: req.params.id }, updateData);

    // Renvoie une réponse réussie
    res.status(200).json({ success: true, message: 'Materiel Updated' });
  } catch (error) {
    // Renvoie une réponse d'erreur en cas de problème
    res.status(500).json({ success: false, message: error.message });
  }
};


 // Supprimer un stock par son ID
exports.delete = (req, res) => {
  Materiel.findByIdAndDelete(req.params.id)
    .then((deletedMateriel) => {
      if (!deletedMateriel) {
        return res.status(404).json({ success: false, message: 'Materiel not found' });
      }

      // Supprimer l'image associée
      const imagePath = `src/assets/images/MaterielsAgriculture/${deletedMateriel.image_materiel}`;
      fs.unlinkSync(imagePath);

      res.status(200).json({ success: true, message: 'Materiel deleted successfully' });
    })
    .catch((error) => {
      res.status(500).json({ success: false, message: error.message });
    });
};



exports.search = async (req, res) => {
    try {
      const query = req.query.q;
      // Recherche dans la base de données en utilisant une expression régulière pour rechercher dans le nom
      const results = await Materiel.find({ nom: { $regex: query, $options: 'i' } });
      res.json(results);
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };



