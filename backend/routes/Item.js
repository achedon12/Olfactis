const express = require('express');
const router = express.Router();

const Item = require('../models/Item');
const Category = require('../models/Category');
const State = require('../models/State');
const verifyToken = require("../middleware/jwt");

router.get('/', verifyToken, async (req, res) => {
    try {
        const items = await Item.find().populate('category').populate('state');
        res.status(200).json(items);

    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

router.post('/', verifyToken, async (req, res) => {
    try {
        const newItem = new Item(req.body);
        const itemRegistered = await newItem.save();

        itemRegistered.category = await Category.findById(req.body.category);

        itemRegistered.state = await State.findById(req.body.state);

        res.status(201).json(itemRegistered);

    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

router.get('/:id', verifyToken, async (req, res) => {
    try {
        const item = await Item.findById(req.params.id).populate('category').populate('state');

        if (!item) {
            return res.status(404).json({message: 'item not found'});
        }

        res.status(200).json(item);

    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

router.put('/:id', verifyToken, async (req, res) => {
    try {
        const item = await Item.findByIdAndUpdate(req.params.id).populate('category').populate('state');

        if (!item) {
            return res.status(404).json({message: 'item not found'});
        }

        item.set(req.body);
        item.updated_at = new Date();
        const itemUpdated = await item.save();
        res.status(200).json(itemUpdated);

    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);

        if (!item) return res.status(404).json({message: 'item not found'});

        item.deleted = true;
        await item.save();
        res.status(200).json({message: 'item deleted successfully'});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

module.exports = router;