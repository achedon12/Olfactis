const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();
const User = require('../models/User');

router.post('/register', async (req, res) => {
    try {
        const password = req.body.password;
        if (!password) {
            return res.status(400).json({message: 'Password is required'});
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            ...req.body,
            password: hashedPassword
        });
        const userRegistered = await newUser.save();
        res.status(201).json(userRegistered);

    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email, password: req.body.password});
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }
        user.token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
        await user.save();
        res.status(200).json(user);

    } catch (error) {
        res.status(400).json({message: error.message});
    }
});


module.exports = router;