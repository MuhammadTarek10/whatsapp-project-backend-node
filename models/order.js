const mongoose = require('mongoose');
const Joi = require('joi');

const orderSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    price: {
        type: Number,
        min: 0
    },
    startDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    endDate: {
        type: Date,
        required: true,
        default: Date.now()
    },
    numberOfMessages: {
        type: Number,
        required: true,
        default: 300
    } 
});

const Order = mongoose.model('Order', orderSchema);

function validateOrder(order) {
    const schema = {
        user_id: Joi.string().min(5).max(50).required(),
        price: Joi.number().min(10).required()
    };

    return Joi.validate(order, schema);
}

exports.orderSchema = orderSchema;
exports.validate = validateOrder;
exports.Order = Order;