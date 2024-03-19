const Stock = require('../../Model/Agriculture/MethodeStock');
// Créer un nouveau stock
exports.createStock = async (req, res) => {
  const { title, description, image_MethodStock } = req.body;

  // Créer une nouvelle instance de la culture
  const nouvelleStock = new Stock({
    title:title,
    description: description,
    image_MethodStock:image_MethodStock
  });

  nouvelleStock.save()
    .then(Stocks => {
      res.status(201).json({ message: 'Culture créée avec succès', stock: Stocks });
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
  };
  
  // Récupérer tous les stocks
  exports.getStocks  = (req, res) => {
    Stock.find()
      .then(Stocks => res.status(200).json(Stocks))
      .catch(err => res.status(400).json({error: err.message}));

  };
  
  // Récupérer un stock par son ID
  exports.getStockById = async (req, res) => {
    try {
      const stock = await Stock.findById(req.params.id);
      if (!stock) {
        return res.status(404).json({ success: false, message: 'Stock not found' });
      }
      res.status(200).json({ success: true, data: stock });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  };
  
  // Mettre à jour un stock par son ID
  exports.updateStock = (req, res, next) => {
    Stock.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({success : true, message: ' Modifier !'}))
      .catch(error => res.status(400).json({ error }));
  };
  
  // Supprimer un stock par son ID
  exports.deleteStock = (req, res, next) => {
    Stock.deleteOne({ _id: req.params.id })
  .then(() => res.status(200).json({success : true, message: 'Supprimer !'}))
  .catch(error => res.status(400).json({ error }));
};

exports.search = async (req, res) => {
  try {
    const query = req.query.q;
    // Recherche dans la base de données en utilisant une expression régulière pour rechercher dans le titre
    const results = await Stock.find({ title: { $regex: query, $options: 'i' } });
    res.json(results);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}