const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const AuthRouter = require('./Router/Authentification');
const app = express();

app.use(bodyParser.json());
// Connexion à la base de données MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/Agriculture', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connecté à la base de données MongoDB');
})
.catch(err => {
    console.error('Erreur de connexion à la base de données :', err);
    process.exit(1);
});

app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
app.use('/authentification', AuthRouter);
module.exports = app;