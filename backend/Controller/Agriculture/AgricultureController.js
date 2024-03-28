// controllers/AgricultureController.js
const Agriculture = require('../../Model/Agriculture/Agriculture');
const Materiel = require('../../Model/Agriculture/MaterielModel');
const MethodeStock = require('../../Model/Agriculture/MethodeStock');
const Medicament = require('../../Model/Agriculture/Medicament');

const fs = require('fs');


//create Agriculture
exports.create = async (req, res) => {
  const {
    nom_agriculture,
    date_plantation,
    date_recolte,
    methode_irrigation,
    quantite_eau_irrigation,
    frequence_surveillance,
    date_derniere_surveillance,
    remarques,
    saisonId, 
    categorieId, 
    materials,
    MethodesStock, 
    MedicamentsCulture,
  } = req.body;

  const imageName = req.file.filename;

  try {
    // Create the Agriculture entry
    const newAgriculture = await Agriculture.create({
      nom_agriculture,
      date_plantation,
      date_recolte,
      methode_irrigation,
      quantite_eau_irrigation,
      frequence_surveillance,
      date_derniere_surveillance,
      image_agriculture: imageName,
      remarques,
      saison: saisonId, 
      categorie: categorieId,
      materiels: materials,
      MethodesStock:MethodesStock, 
      MedicamentsCulture:MedicamentsCulture,
      
    });
    await Materiel.updateMany({ '_id': newAgriculture.materiels }, { $push: { Agricultures: newAgriculture._id } });
    await MethodeStock.updateMany({ '_id': newAgriculture.MethodesStock }, { $push: { Agricultures: newAgriculture._id } });
    await Medicament.updateMany({ '_id': newAgriculture.MedicamentsCulture }, { $push: { Agricultures: newAgriculture._id } });
    res.json({ success: true, message: 'Agriculture created', data: newAgriculture });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Récupérer toutes les Agricultures
exports.all = async (req, res) => {
    try {
      const Agricultures = await Agriculture.find().populate('saison categorie materiels MethodesStock MedicamentsCulture');
      const AgriculturesWithImagePaths = Agricultures.map(agriculture => ({
        ...agriculture._doc,
        image_agriculture: agriculture.image_agriculture ? `http://localhost:3001/images/Agricultures/${agriculture.image_agriculture}` : null // Ajouter le chemin d'accès complet au dossier images
      }));
      res.status(200).json({ success: true, data: AgriculturesWithImagePaths });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

// Récupérer une Agriculture par son ID
exports.getAgricultureById = async (req, res) => {
  try {
    const agriculture = await Agriculture.findById(req.params.id).populate('saison categorie materiels MethodesStock MedicamentsCulture');
    if (!agriculture) {
      return res.status(404).json({ success: false, message: 'Agriculture not found' });
    }
    res.status(200).json({ success: true, data: agriculture });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Mettre à jour une Agriculture par son ID
exports.update = async (req, res) => {
  try {
    const { nom_agriculture, date_plantation, date_recolte, methode_irrigation, quantite_eau_irrigation, frequence_surveillance, date_derniere_surveillance, remarques, saisonId, categorieId, materials, MethodesStock, MedicamentCulture } = req.body;

    let updateData = {
      nom_agriculture,
      date_plantation,
      date_recolte,
      methode_irrigation,
      quantite_eau_irrigation,
      frequence_surveillance,
      date_derniere_surveillance,
      remarques,
      saison: saisonId,
      categorie: categorieId,
      materiels: materials,
      MethodesStock:MethodesStock, 
      MedicamentCulture:MedicamentCulture,
    };
    // await Materiel.updateMany({ '_id': updateData.materiels }, { $push: { cultures: updateData._id } });
    // await MethodeStock.updateMany({ '_id': updateData.MethodesStock }, { $push: { cultures: updateData._id } });
    // await Medicament.updateMany({ '_id': updateData.MedicamentsCulture }, { $push: { cultures: updateData._id } });
     // Vérifiez si une nouvelle image est téléchargée
    if (req.file) {
      // Supprimez l'ancienne image
      const agriculture = await Agriculture.findById(req.params.id);
      if (agriculture) {
        const imagePath = `src/assets/images/Agricultures/${agriculture.image_agriculture}`;
        fs.unlinkSync(imagePath);
      }

      // Mettez à jour le nom de l'image dans la base de données
      const imageName = req.file.filename;
      updateData.image_agriculture = imageName;
    }

    const updatedAgriculture = await Agriculture.findByIdAndUpdate(req.params.id, updateData, { new: true });

    if (!updatedAgriculture) {
      return res.status(404).json({ success: false, message: 'Agriculture not found' });
    }
    // Retirer la culture mise à jour des anciens matériaux et stocks
    await Materiel.updateMany({}, { $pull: { Agricultures: updatedAgriculture._id } });
    await MethodeStock.updateMany({}, { $pull: { Agricultures: updatedAgriculture._id } });
    await Medicament.updateMany({}, { $pull: { Agricultures: updatedAgriculture._id } });
    // Ajouter la nouvelle culture aux nouveaux matériaux et stocks
    await Materiel.updateMany({ '_id': { $in: materials } }, { $addToSet: { Agricultures: updatedAgriculture._id } });
    await MethodeStock.updateMany({ '_id': { $in: MethodesStock } }, { $addToSet: { Agricultures: updatedAgriculture._id } });
    await Medicament.updateMany({ '_id': { $in: MedicamentCulture } }, { $addToSet: { Agricultures: updatedAgriculture._id } });

    res.status(200).json({ success: true,message: 'Agriculture Updated', data: updatedAgriculture });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// Supprimer une Agriculture par son ID
// Supprimer une Agriculture par son ID
exports.delete = async (req, res) => {
  try {
    const agriculture = await Agriculture.findByIdAndDelete(req.params.id);
    if (!agriculture) {
      return res.status(404).json({ success: false, message: 'Agriculture not found' });
    }
    
    // Supprimer l'image associée
    const imagePath = `src/assets/images/Agricultures/${agriculture.image_Agriculture}`;
    fs.unlinkSync(imagePath);

    res.status(200).json({ success: true, message: 'Agriculture deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};



