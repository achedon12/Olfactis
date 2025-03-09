const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/jwt');

const UserSubscription = require('../models/UserSubscription');

router.get('/:id', verifyToken, async (req, res) => {
    try {
        const userSubscriptions = await UserSubscription.find({user: req.params.id}).populate('subscription');
        res.json(userSubscriptions);
    } catch (error) {
        res.status(400).json({ error: error });
    }
});

router.post('/', verifyToken, async (req, res) => {
    try {
        const userSubscription = new UserSubscription({
            user: req.body.user,
            subscription: req.body.subscription,
            start_date: req.body.start_date,
            end_date: req.body.end_date
        });
        const savedUserSubscription = await userSubscription.save();
        res.json(savedUserSubscription);
    } catch (error) {
        res.status(400).json({ error: error });
    }
});

router.put('/:id', verifyToken, async (req, res) => {
    try {
        const userSubscription = {
            user: req.body.user,
            subscription: req.body.subscription,
            start_date: req.body.start_date,
            end_date: req.body.end_date
        };
        const updatedUserSubscription = await UserSubscription.findByIdAndUpdate(req.params.id, userSubscription, { new: true });
        res.json(updatedUserSubscription);
    } catch (error) {
        res.status(400).json({ error: error });
    }
});

router.delete('/:id', verifyToken, async (req, res) => {
    try {
        await UserSubscription.findByIdAndDelete(req.params.id);
        res.json({ message: 'User subscription deleted' });
    } catch (error) {
        res.status(400).json({ error: error });
    }
});

module.exports = router;