const Stock = require('../../Model/ProductionAgriculture/GestionStocks');

// Ajouter
exports.create = async (req, res) => {
    try {
        const agriculteurId = req.userId;
        const newData = {
            Agriculteur: agriculteurId,
            ...req.body,
        };

        const newState = new Stock(newData);
        const savedState = await newState.save();

        res.status(201).json(savedState);
    } catch (error) {
        console.error('Erreur lors de l\'enregistrement :', error);
        res.status(500).json({ message: 'Erreur lors de l\'enregistrement.' });
    }
};
// afficher stock selon agriculteur qui connecter
exports.getstockByAgriculteur = async (req, res) => {
    try {
      const agriculteurId = req.userId;
     // console.log(agriculteurId)
      const stocks = await Stock.find({ Agriculteur: agriculteurId });
      res.status(200).json(stocks);
    } catch (error) {
      console.error('Erreur lors de la récupération des agriculture de l\'agriculteur :', error);
      res.status(500).json({ message: 'Erreur lors de la récupération des cultures de l\'agriculteur.' });
    }
  };
// supprimer
exports.delete = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedItem = await Stock.findByIdAndDelete(id);

        if (!deletedItem) {
            return res.status(404).json({ message: 'L\'élément à supprimer est introuvable.' });
        }

        res.status(200).json({ message: 'L\'élément a été supprimé avec succès.' });
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'élément :', error);
        res.status(500).json({ message: 'Erreur lors de la suppression de l\'élément.' });
    }
};
// modifier
exports.update = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    try {
        const updatedData = await Stock.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedData) {
            return res.status(404).json({ message: "Données non trouvées" });
        }

        res.status(200).json(updatedData);
    } catch (error) {
        console.error("Erreur lors de la mise à jour des données :", error);
        res.status(500).json({ message: "Erreur lors de la mise à jour des données." });
    }
};
// afficher les donnees selon id
exports.getById = async (req, res) => {
    try {
        const stocks = await Stock.findById(req.params.id);
        if (!stocks) {
          return res.status(404).json({ success: false, message: "culture n'est pas trouver" });
        }
        res.status(200).json({stocks});
      } catch (err) {
        res.status(500).json({ success: false, message: err.message });
      }
    
};
