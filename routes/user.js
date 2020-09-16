const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');


// ROUTE DES METHODES PRENSENTENT DANS CONTROLLERS/USER
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;