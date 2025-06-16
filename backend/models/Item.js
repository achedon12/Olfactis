const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: true
    },
    reference: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    state: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'State',
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    deleted: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Item', ItemSchema);