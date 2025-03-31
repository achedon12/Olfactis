const Subscription = require('../models/Subscription');

const seedSubscription = async () => {
    const subscriptions = [
        {
            name: 'Basic',
            description: 'Basic subscription',
            price: 0,
            duration: 1,
            booking_limit: 1,
            loan_limit: 1
        },
        {
            name: 'Premium',
            description: 'Premium subscription',
            price: 10,
            duration: 2,
            booking_limit: 2,
            loan_limit: 2
        },
        {
            name: 'Gold',
            description: 'Gold subscription',
            price: 20,
            duration: 3,
            booking_limit: 3,
            loan_limit: 3
        },
        {
            name: 'Diamond',
            description: 'Diamond subscription',
            price: 30,
            duration: 5,
            booking_limit: 5,
            loan_limit: 5
        },
        {
            name: 'admin',
            description: 'Admin subscription',
            price: -1,
            duration: -1,
            booking_limit: -1,
            loan_limit: -1
        }
    ];

    await Subscription.deleteMany({});

    await Subscription.insertMany(subscriptions);

    console.log('Subscriptions seeded');
};

module.exports = seedSubscription;