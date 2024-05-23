const Utilisateur = require('../../Model/Authentification/Utilisateur');
const argon2 = require('argon2');
const fs = require('fs').promises;
const path = require('path');

// Modifier le profil de l'utilisateur administrateur
exports.update = async (req, res) => {
  try {
    const { adresse, numeroTelephone } = req.body;

    // Vérifier s'il y a un fichier image à mettre à jour
    let newImageName = null;
    if (req.file) {
      newImageName = req.file.filename;
    }

    // Trouver l'utilisateur administrateur par ID
    const admin = await Utilisateur.Admin.findById(req.params.id);
    if (!admin) {
      return res.status(404).json({ message: 'Utilisateur administrateur non trouvé' });
    }

    // Mettre à jour les champs du profil
    admin.adresse = adresse;
    admin.numeroTelephone = numeroTelephone;

    // Mettre à jour l'image seulement si une nouvelle image est envoyée
    if (newImageName) {
      // Supprimer l'ancienne image si elle existe et n'est pas une URL externe
      if (admin.image && !admin.image.startsWith('http')) {
        const imagePath = path.join('src/assets/images/Utilisateur/Admin/', admin.image);
        await fs.unlink(imagePath); // Supprimer l'ancienne image du système de fichiers
      }
      // Mettre à jour le nom de la nouvelle image
      admin.image = newImageName;
    }

    // Enregistrer les modifications dans la base de données
    await admin.save();

    res.status(200).json({ message: 'Profil mis à jour avec succès', admin });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du profil :', error);
    res.status(500).json({ error: 'Erreur interne du serveur lors de la mise à jour du profil' });
  }
};


// Mettre à jour le mot de passe de l'utilisateur administrateur
exports.updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;
    const adminId = req.params.id;

    // Vérifier que le nouveau mot de passe correspond à la confirmation
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ success: false, message: "Le nouveau mot de passe ne correspond pas à la confirmation" });
    }

    // Trouver l'utilisateur administrateur par ID
    const admin = await Utilisateur.Admin.findById(adminId);
    if (!admin) {
      return res.status(404).json({ success: false, message: 'Utilisateur administrateur non trouvé' });
    }

    // Vérifier que le mot de passe actuel correspond
    const currentPasswordValid = await argon2.verify(admin.password, currentPassword);
    if (!currentPasswordValid) {
      return res.status(400).json({ success: false, message: 'Mot de passe actuel incorrect' });
    }

    // Mettre à jour le mot de passe
    const hashedNewPassword = await argon2.hash(newPassword);
    admin.password = hashedNewPassword;
    await admin.save();

    res.status(200).json({ success: true, message: 'Mot de passe mis à jour avec succès' });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du mot de passe :', error);
    res.status(500).json({ success: false, error: 'Erreur interne du serveur lors de la mise à jour du mot de passe' });
  }
};


