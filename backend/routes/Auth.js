const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');

const router = express.Router();
const User = require('../models/User');
const sendMail = require("../utils/mailer");

router.post('/register', async (req, res) => {
    try {
        const newUser = new User(req.body);
        newUser.password = await bcrypt.hash(req.body.password, 10);
        const token = jwt.sign({ email: newUser.email }, process.env.JWT_SECRET);
        newUser.token = token;
        newUser.verification_token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

        await newUser.save();
        res.status(201).json({ token });

        await sendMail(req.body.email, 'Account verification', 'registration.html', {token: newUser.verification_token, email: req.body.email, firstname: req.body.firstname, verification_link: process.env.APP_URL + '/api/auth/verify/' + newUser.verification_token});
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
            user.updated_at = new Date();
            await user.save();
            res.status(200).json({ token });
        } else {
            res.status(401).json({ message: 'Invalid password' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/verify/:token', async (req, res) => {
    try {
        const user = await User.findOne({ verification_token: req.params.token });
        if (!user) {
            res.sendFile(path.join(__dirname, '../views/invalid_token.html'));
        }

        user.verified_at = new Date();
        user.updated_at = new Date();
        user.verification_token = null;
        await user.save();

        res.sendFile(path.join(__dirname, '../views/verification.html'));
    } catch (error) {
        res.status(400).send('<h1>Error verifying account</h1>');
    }
});


module.exports = router;