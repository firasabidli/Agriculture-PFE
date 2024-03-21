const Medicament = require('../../Model/Agriculture/Medicament');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Configuration de Multer pour gérer le téléchargement d'images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../frontend/src/images/Medicament/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage }).single('image');

// Méthode pour créer un nouveau médicament
exports.createMedicament = async (req, res) => {
  try {
    // Télécharger l'image avec Multer
    upload(req, res, async function (err) {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      const { nomMedicament, description } = req.body;

      // Créer un nouvel objet Medicament
      const newMedicament = new Medicament({
        nomMedicament,
        description,
        image: req.file ? req.file.filename : null
      });

      // Enregistrer le nouvel objet Medicament dans la base de données
      const savedMedicament = await newMedicament.save();

      // Répondre avec le médicament créé
      res.status(201).json({ message: 'Médicament créé avec succès', medicament: savedMedicament });
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//affichage
//affichage
exports.getMedicament = async (req, res) => {
  Medicament.find()
  .then(medicaments => res.status(200).json(medicaments))
  .catch(err => res.status(400).json({error: err.message}));
};



//delete
exports.deleteMedicament = (req, res, next) => {
  Medicament.findByIdAndDelete(req.params.id)
  .then((deletedMedicament) => {
    if (!deletedMedicament) {
      return res.status(404).json({ success: false, message: 'Medicament not found' });
    }

    // Supprimer l'image associée
    if (deletedMedicament.image) {
      const imagePath = `../frontend/src/images/Medicament/${deletedMedicament.image}`;
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
        res.status(200).json({ success: true, message: 'Image supprimée avec succès' });
      } else {
        console.log('Image not found:', imagePath);
        res.status(404).json({ success: false, message: 'Image not found' });
      }
    } else {
      res.status(200).json({ success: true, message: 'Aucune image associée à supprimer' });
    }
  })
  .catch((error) => {
    res.status(500).json({ success: false, message: error.message });
  });
};


//search
exports.search = async (req, res) => {
  try {
    const query = req.query.q;
    // Recherche dans la base de données en utilisant une expression régulière pour rechercher dans le titre
    const results = await Medicament.find({ title: { $regex: query, $options: 'i' } });
    res.json(results);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}
//update
exports.updateMedicament = async (req, res) => {
  try {
    upload(req, res, async function (err) {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
console.log(req.body)
      const { nomMedicament, description } = req.body;
      let updateData = { nomMedicament, description };
      console.log(req.file);
      if (req.file) {
        // Supprimer l'ancienne image si elle existe
        const oldMedicament = await Medicament.findById(req.params.id);
        if (oldMedicament && oldMedicament.image) {
          const imagePath =  `../frontend/src/images/Medicament/${oldMedicament.image}`;
          fs.unlinkSync(imagePath);
        }

        // Mettre à jour le nom de la nouvelle image
        const imageName = req.file.filename;
        updateData.image = imageName;
      }

      // Mettre à jour les données du médicament
      await Medicament.updateOne({ _id: req.params.id }, updateData);
      res.status(200).json({ success: true, message: 'Medicament Updated' });
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
