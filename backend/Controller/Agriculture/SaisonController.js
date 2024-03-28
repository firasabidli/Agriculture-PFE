const Saison = require('../../Model/Agriculture/SaisonModel');


exports.all = async (req, res) => {
    try {
      const saisons = await Saison.find().populate('Agricultures');
      res.status(200).json({ success: true, data: saisons });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  };