const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

const User = require('../models/User');

router.post('/create', async (req, res) => {
    try {
        const newUser = new User(req.body);
        newUser.password = await bcrypt.hash(req.body.password, 10);
        const userRegistered = await newUser.save();
        res.status(201).json(userRegistered);

    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

router.get('/list', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);

    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

router.get('/:id', async (req, res) => {
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

router.put('/update/:id', async (req, res) => {
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

router.delete('/delete/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }

        res.status(200).json({message: 'User deleted'});

    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

module.exports = router;