const mongoose = require('mongoose');
const argon2 = require('argon2');
const userSchema = new mongoose.Schema({
  cin: { type: String, required: true,immutable: true},
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  adresse: { type: String, required: true },
  email: { type: String, required: true},
  dateNaissance: { type: Date, required: true },
  numeroTelephone: { type: String, required: true },
  role: { type: String, required: true },
  accepte:{ type: String, required: true },
  password: { type: String, required: true },
});

const UserModel = mongoose.model('Utilisateur', userSchema);
// const newUser = new UserModel({
//     cin: '123456',
//     nom: 'Doe',
//     prenom: 'John',
//     adresse: '123 Main St',
//     email: 'john.doe@example.com',
//     dateNaissance: '01/01/1990',
//     role: 'admin',
//     accepte:'1',
//     numeroTelephone:'25803695',
//     password: '123',
//   });
  
//   argon2.hash(newUser.password)
//   .then(hashedPassword => {
//     newUser.password = hashedPassword; // Set the hashed password
//     return newUser.save();
//   })
//   .then(() => {
//     console.log('Utilisateur enregistré avec succès.');
//   })
//   .catch((error) => {
//     console.error('Erreur lors de l\'enregistrement de l\'utilisateur :', error);
//   });
module.exports = UserModel;