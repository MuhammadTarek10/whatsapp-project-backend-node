const express = require('express');
const user = require('../routes/user');
const order = require('../routes/order');
const archieve = require('../routes/archieve');

module.exports = function(app){
    app.use(express.json());
    app.use('/api/users', user);
    app.use('/api/orders', order);
    app.use('/api/archieve', archieve);
}
