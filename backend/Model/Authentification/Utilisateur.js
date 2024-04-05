const mongoose = require('mongoose');
const { Schema } = mongoose;

// Schéma de base pour tous les utilisateurs
const userSchema = new Schema({
  cin: { type: String, required: true, immutable: true },
  nom: { type: String, required: true },
  adresse: { type: String, required: true },
  email: { type: String, required: true },
  dateNaissance: { type: Date, required: true },
  numeroTelephone: { type: String, required: true },
  accepte: { type: String, required: true },
  password: { type: String, required: true },
});

// Définir un schéma pour l'administrateur en tant que sous-ensemble du schéma utilisateur de base
const adminSchema = new Schema({
  role: { type: String, default: 'admin' },
  // Autres champs spécifiques à l'administrateur...
});

// Définir un sous-modèle pour l'agriculteur
const agriculteurSchema = new Schema({
  role: { type: String, default: 'agriculteur' },
  // Autres champs spécifiques à l'agriculteur...
});

// Créer un modèle utilisateur basé sur le schéma de base
const UserModel = mongoose.model('Utilisateur', userSchema);

// Créer le sous-modèle pour l'administrateur
UserModel.Admin = UserModel.discriminator('Admin', adminSchema);

// Créer le sous-modèle pour l'agriculteur
UserModel.Agriculteur = UserModel.discriminator('Agriculteur', agriculteurSchema);

module.exports = UserModel;
