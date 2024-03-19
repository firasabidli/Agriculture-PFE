const Materiel = require('../../Model/Agriculture/MaterielModel');
const fs = require('fs');

//create Materiel
exports.create = async (req, res) => {
  const { name,description, } = req.body;

  const imageName = req.file.filename;

  try {
    
    const newMateriel = await Materiel.create({
      name,
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
    const Materiels = await Materiel.find();
    res.status(200).json({ success: true, data: Materiels });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Récupérer une Materiel par son ID
exports.getMaterielById = async (req, res) => {
  try {
    const Materiel = await Materiel.findById(req.params.id);
    if (!Materiel) {
      return res.status(404).json({ success: false, message: 'Materiel not found' });
    }
    res.status(200).json({ success: true, data: Materiel });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Mettre à jour une Materiel par son ID
exports.update = async (req, res) => {
  try {
    const { name,description } = req.body;

    let updateData = {
     name,
     description,
      
    };

    // Vérifiez si une nouvelle image est téléchargée
    if (req.file) {
      // Supprimez l'ancienne image
      const Materiel = await Materiel.findById(req.params.id);
      if (Materiel) {
        const imagePath = `../frontend/src/images/${Materiel.image_materiel}`;
        fs.unlinkSync(imagePath);
      }

      // Mettez à jour le nom de l'image dans la base de données
      const imageName = req.file.filename;
      updateData.image_materiel = imageName;
    }

    const updatedMateriel = await Materiel.findByIdAndUpdate(req.params.id, updateData, { new: true });

    if (!updatedMateriel) {
      return res.status(404).json({ success: false, message: 'Materiel not found' });
    }

    res.status(200).json({ success: true,message: 'Materiel Updated', data: updatedMateriel });
  } catch (error) {
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
      const imagePath = `../frontend/src/images/${deletedMateriel.image_materiel}`;
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
      const results = await Materiel.find({ name: { $regex: query, $options: 'i' } });
      res.json(results);
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };



