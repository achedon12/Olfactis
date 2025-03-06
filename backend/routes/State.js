const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

const State = require('../models/State');
const verifyToken = require("../middleware/jwt");

router.post('/create', verifyToken, async (req, res) => {
    try {
        const newState = new State(req.body);
        const StateRegistered = await newState.save();
        res.status(201).json(StateRegistered);

    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

router.get('/list', verifyToken, async (req, res) => {
    try {
        const States = await State.find();
        res.status(200).json(States);

    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

router.get('/:id', verifyToken, async (req, res) => {
    try {
        const state = await State.findById(req.params.id);

        if (!state) {
            return res.status(404).json({message: 'State not found'});
        }

        res.status(200).json(state);

    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

router.put('/update/:id', verifyToken, async (req, res) => {
    try {
        const state = await State.findByIdAndUpdate(req.params.id);

        if (!state) {
            return res.status(404).json({message: 'State not found'});
        }

        state.set(req.body);
        const stateUpdated = await state.save();
        res.status(200).json(stateUpdated);

    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

router.delete('/delete/:id', verifyToken, async (req, res) => {
    try {
        const state = await State.findByIdAndDelete(req.params.id);

        if (!state) {
            return res.status(404).json({message: 'State not found'});
        }

        res.status(200).json({message: 'State deleted'});

    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

module.exports = router;