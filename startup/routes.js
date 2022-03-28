const express = require('express');
const user = require('../routes/user');
const order = require('../routes/order');

module.exports = function(app){
    app.use(express.json());
    app.use('/api/users', user);
    app.use('/api/orders', order);
}
