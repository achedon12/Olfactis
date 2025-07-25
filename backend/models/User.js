const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: false,
        default: null
    },
    verified_at: {
        type: Date,
        required: false,
        default: null
    },
    verification_token: {
        type: String,
        required: false,
        default: null
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    subscription: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subscription',
        required: true
    },
    deleted: {
        type: Boolean,
        default: false
    },
    newsletter: {
        type: Boolean,
        default: false
    },
});

module.exports = mongoose.model('User', UserSchema);