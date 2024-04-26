const Engrais= require('../../Model/ProductionAgriculture/historiqueEngrais');
// ajouter
exports.create= async(req,res)=>{
   
    try {
        const agriculteurId = req.userId;
        const newData = {
          Agriculteur: agriculteurId,
          ...req.body, 
        };
    
        const newState = new Engrais(newData);
        const savedState = await newState.save();
    
        res.status(201).json(savedState);
      } catch (error) {
        console.error('Erreur lors de l\'enregistrement de engais :', error);
        res.status(500).json({ message: 'Erreur lors de l\'enregistrement de engrais.' });
      }
    }
//Affiche
exports.get = async (req, res) => {
      try {
        const cultureId = req.params.id;
        const States = await Engrais.find({ idCulture: cultureId });
    
        if (!States || States.length === 0) {
          return res.status(404).json({ message: 'Aucune donnée  trouvée pour cet culture.' });
        }
    
        res.status(200).json(States);
      } catch (error) {
        console.error('Erreur lors de la récupération des données de engrais par culture :', error);
        res.status(500).json({ message: 'Erreur lors de la récupération des données de engrais.' });
      }
    };