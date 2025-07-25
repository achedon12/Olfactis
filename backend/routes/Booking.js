const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/jwt');

const Booking = require('../models/Booking');
const User = require('../models/User');
const Loan = require('../models/Loan');

router.get('/', verifyToken, async (req, res) => {
    try {
        const bookings = await Booking.find().populate('item').populate('user');
        res.json(bookings);
    } catch (error) {
        res.status(400).json({error: error});
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
        const user = await User.findOne({_id: req.body.user});
        user.populate('subscription');

        let bookings = await Booking.find({item: req.body.item});
        if (bookings.length >= user.subscription.booking_limit && user.subscription.name !== 'admin') {
            res.status(400).json({error: 'You can\'t book more items'});
            return;
        }

        const itemLoanUser = await Loan.findOne({ item: req.body.item });
        itemLoanUser.populate('user');

        if (itemLoanUser.user._id.toString() === user._id.toString()) {
            res.status(400).json({error: 'You can\'t book an item you have already loaned'});
            return;
        }

        let booked = false;
        bookings.forEach((booking) => {
            booking.populate('user');
            if (booking.user._id.toString() === user._id.toString()) {
                booked = true;
            }
        });
        if (booked) {
            res.status(400).json({error: 'You have already booked this item'});
        }

        const booking = new Booking({
            item: req.body.item,
            user: req.body.user,
            start_date: req.body.start_date,
            end_date: req.body.end_date
        });
        await booking.save();
        bookings = await Booking.find({item: booking.item}).populate('item');
        res.status(200).json({bookings});
    } catch (error) {
        console.error(error);
        res.status(400).json({error: error});
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
        const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, booking, {new: true});
        res.json(updatedBooking);
    } catch (error) {
        res.status(400).json({error: error});
    }
});

router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) return res.status(404).json({error: 'Booking not found'});
        booking.deleted = true;
        await booking.save();
        res.json({message: 'Booking deleted successfully'});
    } catch (error) {
        res.status(400).json({error: error});
    }
});

module.exports = router;