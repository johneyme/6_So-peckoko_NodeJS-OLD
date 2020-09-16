const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


// SCHEMA MANGOOSE D'UN UTILISATEUR

const userSchema = mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);