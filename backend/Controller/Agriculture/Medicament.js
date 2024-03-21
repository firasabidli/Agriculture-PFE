const Medicament = require('../../Model/Agriculture/Medicament');
const multer = require('multer');

// Configuration de Multer pour gérer le téléchargement d'images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/assets/images');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, '../frontend/src/assets/Medicaments');
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname);
//   }
// });
const upload = multer({ storage: storage }).single('image');

// Méthode pour créer un nouveau médicament
exports.createMedicament = async (req, res) => {
  try {
    // Télécharger l'image avec Multer
    upload(req, res, async function (err) {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      // Extraire les données du corps de la requête
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
  try {
    const medicaments = await Medicament.find();
    const medicamentsWithImagePaths = medicaments.map(medicament => ({
      ...medicament._doc,
      image: medicament.image ? `http://localhost:3001/images/${medicament.image}` : null // Ajouter le chemin d'accès complet au dossier images
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
    const { nomMedicament, description } = req.body;

    let updateData = {
      nomMedicament,
      description,
    };

    // Vérifiez si une nouvelle image est téléchargée
    if (req.file) {
      // Supprimez l'ancienne image
      const oldMateriel = await Medicament.findById(req.params.id);
      if (oldMateriel) {
        const imagePath = `src/assets/images/${oldMateriel.image}`;
        fs.unlinkSync(imagePath);
      }

      // Mettez à jour le nom de l'image dans la base de données
      const imageName = req.file.filename;
      updateData.image = imageName;
    }

    // Mettez à jour les données du matériel
    await Medicament.updateOne({ _id: req.params.id }, updateData);

    // Renvoie une réponse réussie
    res.status(200).json({ success: true, message: 'Materiel Updated' });
  } catch (error) {
    // Renvoie une réponse d'erreur en cas de problème
    res.status(500).json({ success: false, message: error.message });
  }
};



//delete
exports.deleteMedicament = async (req, res, next) => {
  try {
    await Medicament.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Médicament supprimé!' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
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