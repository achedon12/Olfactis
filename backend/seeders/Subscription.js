const Subscription = require('../models/Subscription');

const seedSubscription = async () => {
    const subscriptions = [
        {
            name: 'Basic',
            description: 'Basic subscription',
            price: 5,
            loan_duration: 7,
            extend_duration: 0,
            booking_limit: 2,
            loan_limit: 1,
            order: 0
        },
        {
            name: 'Premium',
            description: 'Premium subscription',
            price: 15,
            loan_duration: 14,
            extend_duration: 7,
            booking_limit: 5,
            loan_limit: 3,
            order: 1
        },
        {
            name: 'Gold',
            description: 'Gold subscription',
            price: 25,
            loan_duration: 21,
            extend_duration: 14,
            booking_limit: 10,
            loan_limit: 5,
            order: 2
        },
        {
            name: 'Diamond',
            description: 'Diamond subscription',
            price: 40,
            loan_duration: 30,
            extend_duration: 21,
            booking_limit: 15,
            loan_limit: 10,
            order: 3
        },
        {
            name: 'admin',
            description: 'Admin subscription',
            price: -1,
            loan_duration: -1,
            extend_duration: -1,
            booking_limit: -1,
            loan_limit: -1,
            order: 4
        }
    ];

    await Subscription.deleteMany({});
    await Subscription.insertMany(subscriptions);

    console.log('Subscriptions seeded');
};

module.exports = seedSubscription;