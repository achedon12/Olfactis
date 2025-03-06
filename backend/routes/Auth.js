const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();
const User = require('../models/User');

router.post('/register', async (req, res) => {
    try {
        const newUser = new User(req.body);
        newUser.password = await bcrypt.hash(req.body.password, 10);
        const token = jwt.sign({ email: newUser.email }, process.env.JWT_SECRET);
        newUser.token = token;
        await newUser.save();
        res.status(201).json({ token });
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (user && await bcrypt.compare(req.body.password, user.password)) {
            const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
            user.token = token;
            await user.save();
            res.status(200).json({ token });
        } else {
            res.status(401).json({ message: 'Invalid password' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


module.exports = router;