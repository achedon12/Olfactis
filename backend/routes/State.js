const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/jwt');

const State = require('../models/State');

router.get('/list', verifyToken, async (req, res) => {
    try {
        const states = await State.find();
        res.status(200).json(states);

    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

module.exports = router;