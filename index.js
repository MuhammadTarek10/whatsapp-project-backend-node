const express = require('express');

const app = express();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();


const PORT = process.env.PORT || 3000;
const URL = '0.0.0.0'
const server = app.listen(PORT, URL, () => console.log(`Listening to PORT ${PORT}`));


module.exports = server;