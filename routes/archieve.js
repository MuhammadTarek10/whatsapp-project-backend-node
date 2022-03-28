const _ = require('lodash');
const auth = require('../middlewares/auth');
const {Archieve, validate} = require('../models/archieve');
const {User} = require('../models/user');
const express = require('express');
const router = express.Router();


router.post('/send', auth, async(req, res) =>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const user = await User.findById(req.user._id);
    if(!user) return res.status(404).send('User not found');
    
    let archieve = Archieve(_.pick(req.body, ['names', 'phones', 'message']));
    archieve.user_id = req.user._id;
    archieve = await archieve.save();
    res.send(archieve);
});



module.exports = router;