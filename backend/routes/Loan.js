const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/jwt');

const Loan = require('../models/Loan');
const Booking = require("../models/Booking");
const Item = require("../models/Item");
const State = require("../models/State");

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
        const loan = await Loan.findById(req.params.id).populate('item').populate('user');
        res.json(loan);
    } catch (error) {
        res.status(400).json({ error: error });
    }
});

router.post('/', verifyToken, async (req, res) => {
    try {
        const loan = new Loan({
            item: req.body.item,
            user: req.body.user,
            start_date: req.body.start_date,
            end_date: req.body.end_date
        });
        const savedLoan = await loan.save();

        const item = await Item.findOne({ _id: req.body.item });

        const loanedState = await State.findOne({ name: 'LOANED' });
        item.state = loanedState._id;
        await item.save();
        item.populate('state');

        const loans = await Loan.find({ item: item._id });

        res.json({ loans, item });
    } catch (error) {
        res.status(400).json({ error: error });
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