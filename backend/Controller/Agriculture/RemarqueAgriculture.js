const RemarqueAgriculture = require('../../Model/Agriculture/RemarqueAgriculture');
const Utilisateur=require('../../Model/Authentification/Utilisateur')
exports.create=async(req,res)=>{
    try{
        const {Agriculteur,nom_culture,option_Commentaire,commentaire}=req.body;
        const visible=0;
        if(!option_Commentaire){
            return res.status(400).json({ error: 'option du Remarque n est pas selection.' });
        }
        if(!commentaire){
            return res.status(400).json({ error: 'Remarque est vide.' });
        }
        if(!nom_culture){
            return res.status(400).json({ error: 'nom_culture est vide.' });
        }
        const newRemarque= new RemarqueAgriculture({
            Agriculteur,
            nom_culture,
            visible,
            option_Commentaire,
            commentaire
        });
        const savedRemarque= await newRemarque.save();
        res.status(201).json({ message: 'Commentaire enregistrer  avec succès', remarque: savedRemarque });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}
exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { visible } = req.body;

        await RemarqueAgriculture.findByIdAndUpdate(id, { visible });

        res.status(200).json({ message: 'Visibilité du commentaire mise à jour avec succès.' });
    } catch (error) {
        console.error('Erreur lors de la mise à jour de la visibilité du commentaire :', error);
        res.status(500).json({ message: 'Une erreur s\'est produite lors de la mise à jour de la visibilité du commentaire.' });
    }
  };
exports.getByDate = async (req, res) => {
    try {
        const remarques = await RemarqueAgriculture.find({})
            .sort({ date_enregistrement:-1 })
            .populate('Agriculteur');
            for (let remarque of remarques) {
                const agriculteurId = remarque.Agriculteur._id;
                const agriculteur = await Utilisateur.findById(agriculteurId);
                remarque.Agriculteur = agriculteur;
            }
    
        res.status(200).json(remarques); 
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.delete= (req, res) => {
    RemarqueAgriculture.deleteOne({ _id: req.params.id })
  .then(() => res.status(200).json({success : true, message: 'Supprimer !'}))
  .catch(error => res.status(400).json({ error }));
};
