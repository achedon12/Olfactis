const mongoose = require('mongoose');


const StateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        enum: ['AVAILABLE', 'BOOKED', 'LOANED', 'RETURNED']
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('State', StateSchema);