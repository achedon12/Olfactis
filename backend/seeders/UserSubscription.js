const User = require('../models/User');
const Subscription = require('../models/Subscription');
const UserSubscription = require('../models/UserSubscription');

const seedUserSubscription = async () => {
    const users = await User.find({});
    const subscriptions = await Subscription.find({});

    // Create a user subscription for each user
    const userSubscriptions = users.map((user, index) => {
        const subscription = subscriptions[index % subscriptions.length];
        return {
            user: user._id,
            subscription: subscription._id,
            start_date: new Date(),
            end_date: new Date(new Date().setMonth(new Date().getMonth() + subscription.loan_duration))
        };
    });

    await UserSubscription.deleteMany({});
    await UserSubscription.insertMany(userSubscriptions);

    console.log('User subscriptions seeded');
};

module.exports = seedUserSubscription;