const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/jwt');

const Subscription = require('../models/Subscription');

router.get('/', verifyToken, async (req, res) => {
    try {
        const subscriptions = await Subscription.find();
        res.status(200).json(subscriptions);

    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

module.exports = router;