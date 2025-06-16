const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const verifyToken = require('../middleware/jwt');

const User = require('../models/User');
const sendMail = require("../utils/mailer");

router.post('/create', verifyToken, async (req, res) => {
    try {
        const newUser = new User(req.body);
        newUser.password = await bcrypt.hash(req.body.password, 10);
        newUser.verification_token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        const userRegistered = await newUser.save();
        res.status(201).json(userRegistered);

        await sendMail(req.body.email, 'Account verification', 'registration.html', {
            token: newUser.verification_token,
            email: req.body.email,
            firstname: req.body.firstname,
            verification_link: process.env.APP_URL + '/api/auth/verify/' + newUser.verification_token
        });
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

router.post('/resendVerificationEmail', verifyToken, async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email});

        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }
        if (user.verified_at) {
            return res.status(400).json({message: 'User already verified'});
        }

        user.verification_token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        await user.save();

        await sendMail(user.email, 'Account verification', 'registration.html', {
            token: user.verification_token,
            email: user.email,
            firstname: user.firstname,
            verification_link: process.env.APP_URL + '/api/auth/verify/' + user.verification_token
        });
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

router.get('/list', verifyToken, async (req, res) => {
    try {
        const users = await User.find().populate('subscription', 'name').sort({created_at: -1});
        res.status(200).json(users);

    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

router.put('/:id/newsletter', verifyToken, async (req, res) => {
    if (!req.body) {
        return res.status(400).json({message: 'Request body is required'});
    }

    if (![true, false].includes(req.body.newsletter)) {
        return res.status(400).json({message: 'Newsletter preference must be true or false'});
    }

    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }

        user.newsletter = req.body.newsletter;
        const userUpdated = await user.save();

        res.status(200).json(userUpdated);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

router.get('/:id', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }

        res.status(200).json(user);

    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

router.put('/update/:id', verifyToken, async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id);

        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }

        user.set(req.body);
        const userUpdated = await user.save();
        res.status(200).json(userUpdated);

    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) return res.status(404).json({message: 'User not found'});
        user.deleted = true;
        await user.save();
        res.status(200).json({message: 'User deleted'});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

module.exports = router;