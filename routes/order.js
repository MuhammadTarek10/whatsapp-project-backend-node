const _ = require('lodash');
const auth = require('../middlewares/auth');
const {Order, validate} = require('../models/order');
const {User} = require('../models/user');
const express = require('express');
const router = express.Router();


router.get('/all', async(req, res) => {
    const orders = await Order.find();
    res.send(orders);
});

router.post('/buy', async(req, res) => {
    const userFound = await User.findOne(req.user_id);
    if(!userFound) return res.status(400).send('User not found for that id');

    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let  order = Order(_.pick(req.body, ['user_id', 'price', 'startDate', 'endDate', 'numberOfMessages']));
    order = await order.save();

    res.send(order);
});

router.put('/me/:counter', auth, async(req, res) => {
    const user = await User.findById(req.user._id);
    if(!user) return res.status(404).send('No user for that id');

    let order = await Order.findOne({user_id: user._id}).sort([['_id', -1]]);
    if(!order) return res.status(404).send('No orders for that user');
    
    const substract = order.numberOfMessages - req.params.counter;
    if(substract > 0){
        order.numberOfMessages = substract;
        order = await order.save();
        res.send(order);
    }else{
        res.status(401).send('Exceeded!');
    }
});

module.exports = router;