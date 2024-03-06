const User = require('./../Model/Utilisateur');
const argon2 = require('argon2');
exports.create = async (req, res) => {
    const { cin, nom, prenom, adresse, email, dateNaissance,numeroTelephone, password } = req.body;
    const role = 'user';
    const accepte='0';
  
    try {
      // Check if cin or email already exists
      const existingUser = await User.findOne({ $or: [{ cin }, { email }] });
  
      if (existingUser) {
        const errorMessage = existingUser.cin === cin ? 'CIN must be unique' : 'Email must be unique';
        return res.status(400).json({ error: errorMessage });
      }
  
      const hashedPassword = await argon2.hash(password);
      const newUser = new User({
        cin,
        nom,
        prenom,
        adresse,
        email,
        dateNaissance,
        role,
        numeroTelephone,
        accepte,
        password: hashedPassword,
      });
      await newUser.save();
  
      res.status(201).json({ message: 'Utilisateur créé avec succès', user: newUser });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };