const Stock = require('../../Model/Agriculture/MethodeStock');
const multer = require('multer');
const fs = require('fs');

// Configuration de Multer pour gérer le téléchargement d'images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/assets/images/StockageAgriculture');
    const path = require('path');
  },

});
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'src/assets/images/StockageAgriculture');
// const path = require('path');
//   }
// });
const upload = multer({ storage: storage }).single('image_MethodStock');

// Créer un nouveau stock
exports.createStock = async (req, res) => {
  upload(req, res, async function (err) {
    if (err) {
      return res.status(400).json({ error: 'pas du image' });
    }
  const { title, description } = req.body;
  const imageStock = req.file ? req.file.filename : null;
    if (!title) {
      return res.status(400).json({ error: 'Le titre est vide' });
    }
    if (!description) {
      return res.status(400).json({ error: 'description est vide' });
    }
    if (!imageStock) {
      return res.status(400).json({ error: 'choisir Image' });
    }
    if (typeof title !== 'string' || typeof description !== 'string') {
      return res.status(400).json({ error: 'Le titre et la description doivent être des chaînes de caractères.' });
    }
  // Créer
  const nouvelleStock = new Stock({
    title:title,
    description: description,
    image_MethodStock:imageStock
  });

  nouvelleStock.save()
    .then(Stocks => {
      res.status(201).json({ message: 'stock créée avec succès', stock: Stocks });
    })

    .catch(err => {
      res.status(400).json({ error: err.message });
    });
  })
  };
  
  // Récupérer tous les stocks
  exports.getStocks  = async(req, res) => {
    try {
      const stockages = await Stock.find().populate('Agricultures');
      const stockagesWithImagePaths = stockages.map(stock => ({
        ...stock._doc,
        image_MethodStock: stock.image_MethodStock ? `http://localhost:3001/images/StockageAgriculture/${stock.image_MethodStock}` : null
      }));
      res.status(200).json(stockagesWithImagePaths);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
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
    try {
      upload(req, res, async function (err) {
        if (err) {
          return res.status(400).json({ error: err.message });
        }
        // console.log(req.body)
        const { title, description } = req.body;
        let updateData = { title, description };
        // console.log(req.file)
        if (req.file) {
          // Supprimer l'ancienne image si elle existe
          const oldStock = await Stock.findById(req.params.id);
          if (oldStock && oldStock.image_MethodStock) {
            const imagePath = `src/assets/images/StockageAgriculture/${oldStock.image_MethodStock}`;
            fs.unlinkSync(imagePath);
          }
  
          // Mettre à jour le nom de la nouvelle image
          const imageName = req.file.filename;
          updateData.image_MethodStock = imageName;
        }
        await Stock.updateOne({ _id: req.params.id }, updateData);
        res.status(200).json({ success: true, message: 'Stockage Modifier avec succès' });
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }

  };
  
  // Supprimer un stock par son ID
  exports.deleteStock = (req, res, next) => {
    Stock.findByIdAndDelete(req.params.id)
    .then((deletedStock) => {
      if (!deletedStock) {
        return res.status(404).json({ success: false, message: 'stock n est pas trouver' });
      }

      // Supprimer l'image associée
      if (deletedStock.image_MethodStock) {
        const imageName = decodeURIComponent(deletedStock.image_MethodStock);
        const imagePath = `src/assets/images/StockageAgriculture/${imageName}`;
        try {
          if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
            return res.status(200).json({ success: true, message: 'stock supprimer avec succès' });
          } else {
            // console.log('Image not found:', imagePath);
            return res.status(404).json({ success: false, message: 'Image not found' });
          }
        } catch (error) {
          console.error('Error while deleting image:', error);
          return res.status(500).json({ success: false, message: 'Error while deleting image' });
        }
      } else {
        return res.status(200).json({ success: true, message: 'stock avec  success,pas association image' });
      }
    })
    .catch((error) => {
      res.status(500).json({ success: false, message: error.message });
    });
};

exports.search = async (req, res) => {
  try {
    const query = req.query.q;
    const results = await Stock.find({ title: { $regex: query, $options: 'i' } });
    res.json(results);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}