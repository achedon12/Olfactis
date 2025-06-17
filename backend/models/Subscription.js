const mongoose = require('mongoose');

const SubscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    loan_duration: {
        type: Number,
        required: true
    },
    extend_duration: {
        type: Number,
        required: true
    },
    booking_limit: {
        type: Number,
        required: true
    },
    loan_limit: {
        type: Number,
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
    order: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Subscription', SubscriptionSchema);