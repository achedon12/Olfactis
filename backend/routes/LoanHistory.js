const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/jwt');

const LoanReturned = require('../models/LoanReturned');
const {tr} = require("@faker-js/faker");

const handleError = (res, error, message = 'An error occurred') => {
    res.status(400).json({ error: error.message || message });
}

router.get('/', verifyToken, async (req, res) => {
    try {
        const histories = await LoanReturned.find().populate('item').populate('user');
        res.json(histories);
    } catch (error) {
        handleError(res, error);
    }
});

router.get('/:id', verifyToken, async (req, res) => {
    try {
        const history = await LoanReturned.findOne({ item: req.params.id }).populate('item').populate('user');
        res.json(history);
    } catch (error) {
        handleError(res, error);
    }
});

router.post('/', verifyToken, async (req, res) => {
    try {
        const history = new LoanReturned({
            item: req.body.item,
            user: req.body.user,
            start_date: req.body.start_date,
            end_date: req.body.end_date,
            returned_date: req.body.returned_date
        });

        await history.save();
        res.json(history);
    } catch (error) {
        handleError(res, error);
    }
});

router.put('/:id', verifyToken, async (req, res) => {
    try {
        const history = await LoanReturned.findByIdAndUpdate(
            req.params.id,
            {
                item: req.body.item,
                user: req.body.user,
                start_date: req.body.start_date,
                end_date: req.body.end_date,
                returned_date: req.body.returned_date
            },
            { new: true }
        );
        if (!history) {
            return res.status(404).json({ error: 'History not found' });
        }
        res.json(history);
    }
    catch (error) {
        return handleError(res, error);
    }
});

router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const history = await LoanReturned.findByIdAndDelete(req.params.id);
        if (!history) {
            return res.status(404).json({ error: 'History not found' });
        }
        res.json({ message: 'History deleted successfully' });
    } catch (error) {
        handleError(res, error);
    }
});

module.exports = router;