const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/jwt');

const Subscription = require('../models/Subscription');
const User = require("../models/User");

router.get('/', verifyToken, async (req, res) => {
    try {
        const subscriptions = await Subscription.find();
        res.status(200).json(subscriptions);

    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

router.get('/upgradable/:id', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('subscription');

        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }

        const subscriptions = await Subscription.find({
            order: { $gt: user.subscription.order },
            name: { $ne: 'admin' }
        }).sort({ order: 1 });

        res.status(200).json(subscriptions);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

router.put('/upgrade/:id', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('subscription');

        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }

        const newSubscription = await Subscription.findById(req.body.subscriptionId);

        if (!newSubscription) {
            return res.status(404).json({message: 'Subscription not found'});
        }

        if (newSubscription.order <= user.subscription.order) {
            return res.status(400).json({message: 'You can only upgrade to a higher subscription'});
        }

        user.subscription = newSubscription;
        await user.save();

        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

module.exports = router;