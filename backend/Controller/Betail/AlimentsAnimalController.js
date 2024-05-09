const AlimentsAnimal = require('../../Model/Betail/AlimentsAnimalModel');

exports.create = async (req, res) => {
  try {
    const alimentsAnimal = await AlimentsAnimal.create(req.body);
    res.status(201).json({ success: true, message: 'AlimentsAnimal Ajouter ave succés', data: alimentsAnimal });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.all = async (req, res) => {
  try {
    const { idAgriculteur } = req.params;
    const alimentsAnimals = await AlimentsAnimal.find({ idAgriculteur })
    res.status(200).json( { success: true, data: alimentsAnimals } );
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


exports.getCategorieById = async (req, res) => {
  try {
    const alimentsAnimal = await AlimentsAnimal.findById(req.params.id)
    if (!alimentsAnimal) {
      return res.status(404).json({ success: false, message: "AlimentsAnimal n'existe pas" });
    }
    res.status(200).json({ success: true, data: alimentsAnimal });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


exports.update = async (req, res) => {
  try {
    const alimentsAnimal = await AlimentsAnimal.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!alimentsAnimal) {
      return res.status(404).json({ success: false, message: "AlimentsAnimal n'existe pas" });
    }
    res.status(200).json({ success: true, message: 'AlimentsAnimal modifiée avec succés', data: alimentsAnimal });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const alimentsAnimal = await AlimentsAnimal.findByIdAndDelete(req.params.id);
    if (!alimentsAnimal) {
      return res.status(404).json({ success: false, message: "AlimentsAnimal n'existe pas" });
    }
    res.status(200).json({ success: true, message: 'AlimentsAnimal supprimée avec succés' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};