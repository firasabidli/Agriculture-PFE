const RemarqueAgriculture = require('../../Model/Agriculture/RemarqueAgriculture');
exports.create=async(req,res)=>{
    try{
        const {nom_culture,option_Remarque,Remarque}=req.body;
        if(!option_Remarque){
            return res.status(400).json({ error: 'option du Remarque n est pas selection.' });
        }
        if(!Remarque){
            return res.status(400).json({ error: 'Remarque est vide.' });
        }
        if(!nom_culture){
            return res.status(400).json({ error: 'nom_culture est vide.' });
        }
        const newRemarque= new RemarqueAgriculture({
            nom_culture,
            option_Remarque,
            Remarque
        });
        const savedRemarque= await newRemarque.save();
        res.status(201).json({ message: 'Remarque enregistrer  avec succès', remarque: savedRemarque });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}
exports.getByDate = async (req, res) => {
    try {
        const remarques = await RemarqueAgriculture.find({})
            .sort({ date_enregistrement:-1 });
        res.status(200).json(remarques); 
        console.log(remarques)
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.delete= (req, res) => {
    RemarqueAgriculture.deleteOne({ _id: req.params.id })
  .then(() => res.status(200).json({success : true, message: 'Supprimer !'}))
  .catch(error => res.status(400).json({ error }));
};
