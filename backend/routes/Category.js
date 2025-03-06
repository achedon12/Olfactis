const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/jwt');

const Category = require('../models/Category');

router.post('/create', verifyToken, async (req, res) => {
    try {
        const newCategory = new Category(req.body);
        const categoryRegistered = await newCategory.save();
        res.status(201).json(categoryRegistered);

    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

router.get('/list', verifyToken, async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);

    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

router.get('/:id', verifyToken, async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(404).json({message: 'category not found'});
        }

        res.status(200).json(category);

    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

router.put('/update/:id', verifyToken, async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id);

        if (!category) {
            return res.status(404).json({message: 'category not found'});
        }

        category.set(req.body);
        const categoryUpdated = await category.save();
        res.status(200).json(categoryUpdated);

    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

router.delete('/delete/:id', verifyToken, async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);

        if (!category) {
            return res.status(404).json({message: 'category not found'});
        }

        res.status(200).json({message: 'category deleted'});

    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

module.exports = router;