const config = require('config');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        unique: true,
        minlength: 5,
        maxlength: 50
    },
    password: {
        type: String,
        minlength: 5,
    }
});

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id}, config.get('jwtPrivateKey'));
    return token;
}

const User = mongoose.model('User', userSchema);

function validateUser(user){
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(50).required().email(),
        password: Joi.string().min(5).max(50).required()
    };
    return Joi.validate(user, schema);
}

function validateLogin(user){
    const schema = {
        email: Joi.string().min(5).max(50).required().email(),
        password: Joi.string().min(5).max(50).required()
    };
    return Joi.validate(user, schema);
}

async function verifyPassword(oldPassword, newPassword){
    return await bcrypt.compare(newPassword, oldPassword);
}

exports.User = User;
exports.validate = validateUser;
exports.userSchema = userSchema;
exports.validateLogin = validateLogin;
exports.verifyPassword = verifyPassword;