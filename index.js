const config = require('config');
const express = require('express');

const app = express();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();


const port = process.env.PORT || 3000;
const server = app.listen(port, () => console.log(`Listening to PORT ${port}`));


module.exports = server;