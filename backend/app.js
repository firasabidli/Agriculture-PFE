const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const MethRouter =require('./Router/Agriculture/MethodeStock');
const MaterielRouter = require('./Router/Agriculture/MaterielRouter');
const CategorieRouter = require('./Router/Agriculture/CategorieRouter');
const AgricultureRouter = require('./Router/Agriculture/Agriculture')
const Saison = require('./Model/Agriculture/SaisonModel');
const SaisonRouter = require('./Router/Agriculture/SaisonRouter')
const RemarqueRouter=require('./Router/Agriculture/RemarqueAgriculture');
const MedicamentRouter = require('./Router/Agriculture/Medicament');
const AuthRouter = require('./Router/Authentification/Authentification');
const UserModel = require('./Model/Authentification/Utilisateur');
const cors = require('cors');
const verifyAuthToken = require('./Controller/Authentification/verifyAuthTokenMiddleware');
const app = express();
const argon2 = require('argon2');
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
// app.use(bodyParser.json());
// Connexion à la base de données MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/Agriculture', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(async() => {
    console.log('Connecté à la base de données MongoDB');
    Saison.creerSaisonsSiNonExistantes();
    //Admin
    const adminCount = await UserModel.Admin.countDocuments({});
    if (adminCount === 0) {
        // Aucun administrateur trouvé, nous en créons un
        try {
            const hashedPassword = await argon2.hash('123');
            const newAdmin = new UserModel.Admin({
                cin: '1234567890',
                nom: 'Admin',
                adresse: '123 Rue Admin',
                email: 'admin@example.com',
                dateNaissance: new Date('1990-01-01'),
                numeroTelephone: '1234567890',
                accepte:'1',
                password: hashedPassword,
            });
            await newAdmin.save();
            console.log('Administrateur ajouté à la base de données avec succès');
        } catch (error) {
            console.error('Erreur lors de l\'ajout de l\'administrateur à la base de données :', error);
        }
    }
})
.catch(err => {
    console.error('Erreur de connexion à la base de données :', err);
    process.exit(1);
});

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Headers", "Authorization");

    console.log(req.headers['authorization']);
    next();
  });
  app.use('/auth', AuthRouter);
app.use('/MethodeStock',verifyAuthToken, MethRouter);
app.use('/Materiel',verifyAuthToken, MaterielRouter);
app.use('/MedicamentCulture',verifyAuthToken, MedicamentRouter);
app.use('/Categorie',verifyAuthToken, CategorieRouter);
app.use('/Agriculture',verifyAuthToken, AgricultureRouter);
app.use('/RemarqueAgriculture', RemarqueRouter);
app.use('/Saison',verifyAuthToken, SaisonRouter);
app.use('/images', express.static('./src/assets/images'));
module.exports = app;