const mongoose = require('mongoose');
const { Schema } = mongoose;

// Schéma de base pour tous les utilisateurs
const userSchema = new Schema({
  cin: { type: String, required: true, immutable: true },
  nom: { type: String, required: true },
  gouvernorat: {
    type: {
      nom: { type: String, required: true },
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true }
    },
    required: true
  },
  adresse: { type: String, required: true },
  email: { type: String, required: true },
  dateNaissance: { type: Date, required: true },
  numeroTelephone: { type: String, required: true },
  accepte: { type: String, required: true },
  image: { type: String, default: 'https://t4.ftcdn.net/jpg/00/97/00/09/360_F_97000908_wwH2goIihwrMoeV9QF3BW6HtpsVFaNVM.jpg' },
  password: { type: String, required: true },
});

// Définir un schéma pour l'administrateur en tant que sous-ensemble du schéma utilisateur de base
const adminSchema = new Schema({
  role: { type: String, default: 'Admin' },
  username: { type: String, default: 'admin_123' },
  // Autres champs spécifiques à l'administrateur...
});

// Définir un sous-modèle pour l'agriculteur
const agriculteurSchema = new Schema({
  role: { type: String, default: 'Agriculteur' },
  username: { type: String, default: 'agriculteur_123' },
  // Autres champs spécifiques à l'agriculteur...
});

// Créer un modèle utilisateur basé sur le schéma de base
const UserModel = mongoose.model('Utilisateur', userSchema);

// Créer le sous-modèle pour l'administrateur
UserModel.Admin = UserModel.discriminator('Admin', adminSchema);

// Créer le sous-modèle pour l'agriculteur
UserModel.Agriculteur = UserModel.discriminator('Agriculteur', agriculteurSchema);

module.exports = UserModel;