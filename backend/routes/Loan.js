const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/jwt');

const Loan = require('../models/Loan');
const Item = require("../models/Item");
const State = require("../models/State");
const User = require("../models/User");

router.get('/', verifyToken, async (req, res) => {
    try {
        const loans = await Loan.find().populate('item').populate('user');
        res.json(loans);
    } catch (error) {
        res.status(400).json({ error: error });
    }
});

router.get('/:id', verifyToken, async (req, res) => {
    try {
        const loan = await Loan.findOne({ item: req.params.id }).populate('item').populate('user');
        res.json(loan);
    } catch (error) {
        res.status(400).json({ error: error });
    }
});

router.get('/:id/many', verifyToken, async (req, res) => {
    try {
        const loan = await Loan.find({ item: req.params.id }).populate('item').populate('user');
        res.json(loan);
    } catch (error) {
        res.status(400).json({ error: error });
    }
});

router.post('/', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.body.user);

        if (!user) {
            res.status(400).json({ error: 'User not found' });
            return;
        }
        user.populate('subscription');

        let loans = await Loan.find({item: req.body.item});
        if (loans.length >= user.subscription.booking_limit && user.subscription.name !== 'admin') {
            res.status(400).json({error: 'You can\'t book more items'});
            return;
        }

        const loan = new Loan({
            item: req.body.item,
            user: req.body.user,
            start_date: req.body.start_date,
            end_date: req.body.end_date || new Date(Date.now() + 5 * 30 * 24 * 60 * 60 * 1000)
        });
        await loan.save();

        const item = await Item.findOne({ _id: req.body.item });

        const loanedState = await State.findOne({ name: 'LOANED' });
        item.state = loanedState._id;
        await item.save();
        item.populate('state');

        loans = await Loan.find({ user: req.body.user }).populate('item');

        res.json({ loans, item });
    } catch (error) {
        res.status(400).json({ error: error.message || 'An error occurred while processing your request' });
    }
});

router.put('/:id', verifyToken, async (req, res) => {
    try {
        const loan = {
            item: req.body.item,
            user: req.body.user,
            start_date: req.body.start_date,
            end_date: req.body.end_date
        };
        const updatedSave = await Loan.findByIdAndUpdate(req.params.id, loan, { new: true });
        res.json(updatedSave);
    } catch (error) {
        res.status(400).json({ error: error });
    }
});

router.delete('/:id', verifyToken, async (req, res) => {
    try {
        await Loan.findByIdAndDelete(req.params.id);
        res.json({ message: 'Loan deleted' });
    } catch (error) {
        res.status(400).json({ error: error });
    }
});

module.exports = router;