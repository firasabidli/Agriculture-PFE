const Medicament = require('../../Model/Agriculture/Medicament');
const multer = require('multer');
const fs = require('fs');

// Configuration de Multer pour gérer le téléchargement d'images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/assets/images/MedicamentsAgriculture');
const path = require('path');
  }
});
const upload = multer({ storage: storage }).single('image');

// Méthode pour créer un nouveau médicament
exports.createMedicament = async (req, res) => {
  try {
    // Télécharger l'image avec Multer
    upload(req, res, async function (err) {
      if (err) {
        return res.status(400).json({ error: 'pas du image' });
      }

      const { nomMedicament, description } = req.body;
      const imageM = req.file ? req.file.filename : null;
      if (!nomMedicament ) {
        return res.status(400).json({ error: 'nom du medicament est vide.' });
      }
      if (!description ) {
        return res.status(400).json({ error: 'description du medicament est vide.' });
      }
      if(!imageM){
        return res.status(400).json({ error: 'choisir un image.' });
      }
      if (typeof nomMedicament !== 'string' || typeof description !== 'string') {
        return res.status(400).json({ error: 'Le titre et la description doivent être des chaînes de caractères.' });
      }
      // Créer un nouvel objet Medicament
      const newMedicament = new Medicament({
        nomMedicament,
        description,
        image: imageM
      });

      // Enregistrer le nouvel objet Medicament dans la base de données
      const savedMedicament = await newMedicament.save();

      // Répondre avec le médicament créé
      res.status(201).json({ message: 'Engrais créé avec succès', medicament: savedMedicament });
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//affichage
//affichage
exports.getMedicament = async (req, res) => {
  try {
    const medicaments = await Medicament.find().populate('Agricultures');
    const medicamentsWithImagePaths = medicaments.map(medicament => ({
      ...medicament._doc,
      image: medicament.image ? `http://localhost:3001/images/MedicamentsAgriculture/${medicament.image}` : null // Ajouter le chemin d'accès complet au dossier images
    }));
    res.status(200).json(medicamentsWithImagePaths);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
;



//update
//updateMedicament
exports.updateMedicament = async (req, res) => {
  try {
    upload(req, res, async function (err) {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      const { nomMedicament, description } = req.body;
      let updateData = { nomMedicament, description };
      // console.log(req.file)
      if (req.file) {
        // Supprimer l'ancienne image si elle existe
        const oldMedicament = await Medicament.findById(req.params.id);
        if (oldMedicament && oldMedicament.image) {
          const imagePath = `src/assets/images/MedicamentsAgriculture/${oldMedicament.image}`;
          fs.unlinkSync(imagePath);
        }

        // Mettre à jour le nom de la nouvelle image
        const imageName = req.file.filename;
        updateData.image = imageName;
      }
      await Medicament.updateOne({ _id: req.params.id }, updateData);
      res.status(200).json({ success: true, message: 'Engrais modifier avec succées' });
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//search
exports.search = async (req, res) => {
  try {
    const query = req.query.q;
    const results = await Medicament.find({ title: { $regex: query, $options: 'i' } });
    res.json(results);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}
//delete
exports.deleteMedicament = (req, res, next) => {
  Medicament.findByIdAndDelete(req.params.id)
    .then((deletedMedicament) => {
      if (!deletedMedicament) {
        return res.status(404).json({ success: false, message: 'Engrais n est pas trouver ' });
      }

      // Supprimer l'image associée
      if (deletedMedicament.image) {
        const imageName = decodeURIComponent(deletedMedicament.image);
        const imagePath = `src/assets/images/MedicamentsAgriculture/${imageName}`;
        try {
          if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
            return res.status(200).json({ success: true, message: 'Engrais supprimer avec succès' });
          } else {
            // console.log('Image not found:', imagePath);
            return res.status(404).json({ success: false, message: 'Image not found' });
          }
        } catch (error) {
          console.error('Error while deleting image:', error);
          return res.status(500).json({ success: false, message: 'Error while deleting image' });
        }
      } else {
        return res.status(200).json({ success: true, message: 'Engrais supprimer avec succées' });
      }
    })
    .catch((error) => {
      res.status(500).json({ success: false, message: error.message });
    });
  }
