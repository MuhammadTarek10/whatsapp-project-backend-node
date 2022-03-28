const bcrypt = require('bcrypt');
const _ = require('lodash');
const auth = require('../middlewares/auth');
const {User, validate, validateLogin, verifyPassword} = require('../models/user');
const express = require('express');
const router = express.Router();


router.get('/all', auth,  async(req, res) => {
    const users = await User.find();
    res.send(users);
});

router.post('/register', async(req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email});
    if(user) return res.status(400).send('Already Registered');

    user = User(_.pick(req.body, ['name', 'email', 'password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    user = await user.save();

    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
});

router.post('/login', async(req, res) => {
    const {error} = validateLogin(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email});
    if(!user) return res.status(404).send('No user with that email');

    const rightPassword = await verifyPassword(user.password, req.body.password);
    if (rightPassword) return res.status(200).send(user.generateAuthToken());
    res.status(404).send('Invalid Credintials');
});

module.exports = router;