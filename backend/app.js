const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
//Agriculture
const MethRouter =require('./Router/Agriculture/MethodeStock');
const MaterielRouter = require('./Router/Agriculture/MaterielRouter');
const CategorieRouter = require('./Router/Agriculture/CategorieRouter');
const AgricultureRouter = require('./Router/Agriculture/Agriculture')
const Saison = require('./Model/Agriculture/SaisonModel');
const SaisonRouter = require('./Router/Agriculture/SaisonRouter');
const RemarqueRouter=require('./Router/Agriculture/RemarqueAgriculture');
const MedicamentRouter = require('./Router/Agriculture/Medicament');

//Auth
const ProfileRouter = require('./Router/Authentification/ProfileRouter');
const UserProfileRouter = require('./Router/Authentification/userProfileRouter');
const ActiverCompteRouter = require('./Router/Authentification/ActiverCompteRouter');
const AuthRouter = require('./Router/Authentification/Authentification');
const UserModel = require('./Model/Authentification/Utilisateur');

//const verifyAuthToken = require('./Controller/Authentification/verifyAuthTokenMiddleware');
//Bétail
const CategorieBetailRouter = require('./Router/Betail/CategorieBetail');
const BetailRouter = require('./Router/Betail/BetailRouter');
const FicheAnimalRouter=require('./Router/Betail/FicheAnimal');
const SanteBetail=require('./Router/Betail/SanteBetail');
const MouvementBetail = require ('./Router/Betail/MouvementBetail');
//ProductionAgriculture
const ListeAgriculture= require('./Router/ProductionAgriculture/FicheAgriculture');
const historiqueEngrais=require('./Router/ProductionAgriculture/historiqueEngrais');
const historiqueEquipement=require('./Router/ProductionAgriculture/historiqueEquipement');
const historiqueMainOeuvre=require('./Router/ProductionAgriculture/historiqueMainOeuvre');
const historiqueIrrigation=require('./Router/ProductionAgriculture/historiqueIrrigation');
const historiqueRecolte=require('./Router/ProductionAgriculture/historiqueRecolte');
const GestionStock=require('./Router/ProductionAgriculture/GestionStocks');
//chat
const Message=require('./Router/Chat/Message');
const SalleDiscussion=require('./Router/Chat/SalleDiscussion');
const Conversation = require('./Router/Chat/Conversation');
const cors = require('cors');
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
            const hashedPassword = await argon2.hash('1234567');
            const newAdmin = new UserModel.Admin({
                cin: '1234567890',
                nom: 'Admin',
                gouvernorat: {
                    nom: 'Jendouba',
                    latitude: 36.9833,
                    longitude: 10.1167
                  },
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

    // console.log(req.headers['authorization']);
    next();
  });

  //Agriculture

app.use('/MethodeStock', MethRouter);
app.use('/Materiel', MaterielRouter);
app.use('/MedicamentCulture', MedicamentRouter);
app.use('/Categorie', CategorieRouter);
app.use('/Agriculture', AgricultureRouter);
app.use('/RemarqueAgriculture', RemarqueRouter);
app.use('/Saison', SaisonRouter);
//Auth
app.use('/auth', AuthRouter);
app.use('/Profile', ProfileRouter);
app.use('/UserProfile', UserProfileRouter);
app.use('/ActiverCompte', ActiverCompteRouter);
//Bétail
app.use('/CategorieBetail', CategorieBetailRouter);
app.use('/Betail', BetailRouter);
app.use('/FicheAnimal',FicheAnimalRouter);
app.use('/SanteBetail',SanteBetail);
app.use('/MouvementsBetail',MouvementBetail)
//ProductionAgriculture
app.use('/ListeAgriculture',ListeAgriculture);
app.use('/HistoriqueEngrais',historiqueEngrais);
app.use('/HistoriqueEquipement',historiqueEquipement);
app.use('/HistoriqueMainOeuvre',historiqueMainOeuvre);
app.use('/HistoriqueIrrigation',historiqueIrrigation);
app.use('/HistoriqueRecolte',historiqueRecolte);
app.use('/GestionStocks',GestionStock);
//chat
app.use('/salle',SalleDiscussion);
app.use('/Message',Message);
app.use('/Conversations',Conversation)
app.use('/images', express.static('./src/assets/images'));
module.exports = app;