const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/jwt');

const Loan = require('../models/Loan');
const LoanReturned = require('../models/LoanReturned');
const Item = require("../models/Item");
const State = require("../models/State");
const User = require("../models/User");

const handleError = (res, error, message = 'An error occurred') => {
    res.status(400).json({ error: error.message || message });
};

const findUserById = async (userId) => {
    const user = await User.findById(userId).populate('subscription');
    if (!user) throw new Error('User not found');
    return user;
};

router.get('/', verifyToken, async (req, res) => {
    try {
        const loans = await Loan.find().populate('item').populate('user');
        res.json(loans);
    } catch (error) {
        handleError(res, error);
    }
});

router.get('/:id', verifyToken, async (req, res) => {
    try {
        const loan = await Loan.findOne({ item: req.params.id }).populate('item').populate('user');
        res.json(loan);
    } catch (error) {
        handleError(res, error);
    }
});

router.get('/:id/many', verifyToken, async (req, res) => {
    try {
        const loans = await Loan.find({ item: req.params.id }).populate('item').populate('user');
        res.json(loans);
    } catch (error) {
        handleError(res, error);
    }
});

router.post('/', verifyToken, async (req, res) => {
    try {
        const user = await findUserById(req.body.user);

        const loans = await Loan.find({ item: req.body.item });
        if (loans.length >= user.subscription.booking_limit && user.subscription.name !== 'admin') {
            throw new Error('You can\'t book more items');
        }

        const loan = new Loan({
            item: req.body.item,
            user: req.body.user,
            start_date: req.body.start_date,
            end_date: req.body.end_date || new Date(Date.now() + 5 * 30 * 24 * 60 * 60 * 1000)
        });
        await loan.save();

        const item = await Item.findById(req.body.item);
        const loanedState = await State.findOne({ name: 'LOANED' });
        item.state = loanedState._id;
        await item.save();

        const updatedLoans = await Loan.find({ user: req.body.user })
            .populate({ path: 'item', populate: { path: 'category', model: 'Category' } })
            .populate('user');

        res.json({ loans: updatedLoans, item });
    } catch (error) {
        handleError(res, error);
    }
});

router.put('/:id', verifyToken, async (req, res) => {
    try {
        const updatedLoan = await Loan.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedLoan);
    } catch (error) {
        handleError(res, error);
    }
});

router.delete('/:id', verifyToken, async (req, res) => {
    try {
        await Loan.findByIdAndDelete(req.params.id);
        res.json({ message: 'Loan deleted' });
    } catch (error) {
        handleError(res, error);
    }
});

router.put('/return/:id', verifyToken, async (req, res) => {
    try {
        const loan = await Loan.findById(req.params.id).populate('item').populate('user');
        if (!loan) throw new Error('Loan not found');

        const item = loan.item;
        const returnedState = await State.findOne({ name: 'AVAILABLE' });
        item.state = returnedState._id;
        await item.save();

        await Loan.findByIdAndDelete(req.params.id);

        const loanReturned = new LoanReturned({
            item: loan.item._id,
            user: loan.user._id,
            start_date: loan.start_date,
            end_date: loan.end_date,
            returned_at: new Date()
        });
        await loanReturned.save();

        const newLoanReturned = await LoanReturned.findById(loanReturned._id)
            .populate({ path: 'item', populate: { path: 'category', model: 'Category' } })
            .populate('user');
        res.json(newLoanReturned);
    } catch (error) {
        handleError(res, error);
    }
});

router.put('/extend/:id', verifyToken, async (req, res) => {
    try {
        const loan = await Loan.findById(req.params.id);
        if (!loan) throw new Error('Loan not found');

        const user = await findUserById(loan.user._id);

        const currentEndDate = new Date(loan.end_date);
        loan.end_date = new Date(currentEndDate.getTime() + (user.subscription.extend_duration !== -1 ? user.subscription.extend_duration * 24 * 60 * 60 * 1000 : 0));
        loan.updated_at = new Date();
        const updatedLoan = await loan.save();

        res.json(updatedLoan);
    } catch (error) {
        handleError(res, error);
    }
});

module.exports = router;