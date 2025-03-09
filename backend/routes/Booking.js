const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/jwt');

const Booking = require('../models/Booking');

router.get('/', verifyToken, async (req, res) => {
    try {
        const bookings = await Booking.find().populate('item').populate('user');
        res.json(bookings);
    } catch (error) {
        res.status(400).json({ error: error });
    }
});

router.get('/:id', verifyToken, async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id).populate('item').populate('user');
        res.json(booking);
    } catch (error) {
        res.status(400).json({ error: error });
    }
});

router.post('/', verifyToken, async (req, res) => {
    try {
        const booking = new Booking({
            item: req.body.item,
            user: req.body.user,
            start_date: req.body.start_date,
            end_date: req.body.end_date
        });
        const savedBooking = await booking.save();
        res.json(savedBooking);
    } catch (error) {
        res.status(400).json({ error: error });
    }
});

router.put('/:id', verifyToken, async (req, res) => {
    try {
        const booking = {
            item: req.body.item,
            user: req.body.user,
            start_date: req.body.start_date,
            end_date: req.body.end_date
        };
        const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, booking, { new: true });
        res.json(updatedBooking);
    } catch (error) {
        res.status(400).json({ error: error });
    }
});

router.delete('/:id', verifyToken, async (req, res) => {
    try {
        await Booking.findByIdAndDelete(req.params.id);
        res.json({ message: 'Booking deleted' });
    } catch (error) {
        res.status(400).json({ error: error });
    }
});

module.exports = router;