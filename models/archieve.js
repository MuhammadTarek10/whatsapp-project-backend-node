const mongoose = require('mongoose');
const Joi = require('joi');

const archieveSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    message: {
        type: String,
        required: true
    },
    phones: {
        type: Array,
        required: true
    },
    names: {
        type: Array
    }
});

const Archieve = mongoose.model('Archieve', archieveSchema);

function validateArchieve(archieve){
    schema = {
        user_id: Joi.string(),
        names: Joi.array(),
        phones: Joi.array(),
        message: Joi.string().min(1).required()
    }
    return Joi.validate(archieve, schema);
}

exports.Archieve = Archieve;
exports.validate = validateArchieve;