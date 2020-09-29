require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
const path = require('path');
// Utilisation de helmet, collection de 9 middlewares de sécurité : csp, hidePowerBy, hsts, ieNoOpen, noCache, noSniff, frameguard, clickjacking, xssFilter
const helmet = require('helmet');
const morgan = require('morgan');


const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');



// CONNECTION A LA BASE DE DONNEES
mongoose.connect('mongodb+srv://'+process.env.DB_USER+':'+process.env.DB_PASS+"@"+process.env.DB_HOST,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

// SECURITE CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Accès à notre API depuis n'importe qu'elle origine
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); // Permet d'ajouter ces headers aux requêtes envoyées vers l'API
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // Methodes authorisés pour les requêtes HTTP
    next();
});

app.use(bodyParser.json());
app.use(helmet());
app.use(morgan('combined'));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);
module.exports = app;