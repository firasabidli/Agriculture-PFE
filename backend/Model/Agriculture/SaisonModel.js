const mongoose = require('mongoose');

const saisonSchema = new mongoose.Schema({
  nom_saison: String,
  Agricultures: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Agriculture' }]

});

// Méthode statique pour créer les saisons si elles n'existent pas déjà
saisonSchema.statics.creerSaisonsSiNonExistantes = async function() {
  try {
    const Saison = this;
    const saisons = await Saison.find();
    if (saisons.length === 0) {
      const saisonsData = [
        { nom_saison: "Printemps" },
        { nom_saison: "Été" },
        { nom_saison: "Automne" },
        { nom_saison: "Hiver" },
        { nom_saison: "Annuelle" }
      ];
      await Saison.insertMany(saisonsData);
      console.log("Saisons créées avec succès !");
    } else {
      console.log("Les saisons existent déjà. Aucune action nécessaire.");
    }
  } catch (err) {
    console.error("Erreur lors de la création ou vérification des saisons :", err);
  }
};

module.exports = mongoose.model('Saison', saisonSchema);
