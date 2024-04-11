const UserModel = require('../../Model/Authentification/Utilisateur');

// Récupérer tous les comptes à activer (accepte = 0)
exports.all = async (req, res) => {
  try {
    const agriculteurs = await UserModel.Agriculteur.find({ accepte: 0 });
    res.status(200).json(agriculteurs);
  } catch (error) {
    console.error('Erreur lors de la récupération des comptes à activer :', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
};

// Activer un compte (accepte = 1)
exports.activer = async (req, res) => {
  const agriculteurId = req.params.id;

  try {
    const agriculteur = await UserModel.Agriculteur.findById(agriculteurId);
    if (!agriculteur) {
      return res.status(404).json({ error: 'Agriculteur non trouvé' });
    }

    agriculteur.accepte = 1;
    await agriculteur.save();

    res.status(200).json({ message: 'Compte agriculteur activé avec succès' });
  } catch (error) {
    console.error('Erreur lors de l\'activation du compte agriculteur :', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
};

// Refuser et supprimer un compte (accepte = -1)
exports.refuser = async (req, res) => {
  const agriculteurId = req.params.id;

  try {
    const deletedAgriculteur = await UserModel.Agriculteur.findByIdAndDelete(agriculteurId);
    if (!deletedAgriculteur) {
      return res.status(404).json({ error: 'Agriculteur non trouvé' });
    }

    res.status(200).json({ message: 'Compte agriculteur refusé et supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors du refus et de la suppression du compte agriculteur :', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
};
