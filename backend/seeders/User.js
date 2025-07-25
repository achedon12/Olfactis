const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const subscription = require('../models/Subscription');

const NUMBER_OF_USERS = 50;

const seedUsers = async () => {
    await User.deleteMany({});

    const subscriptions = await subscription.find();

    // adminUser
    const adminUser = new User({
        firstname: 'admin',
        lastname: 'admin',
        email: 'admin@gmail.com',
        password: 'admin',
        role: 'admin',
        subscription: subscriptions.find(sub => sub.name === 'admin')._id,
        newsletter: true
    });

    adminUser.password = await bcrypt.hash('admin', 10);
    await adminUser.save();

    // dev user
    const commonUser = new User({
        firstname: 'dev',
        lastname: 'dev',
        email: 'dev@gmail.com',
        password: 'dev',
        subscription: subscriptions.find(sub => sub.name === 'Premium')._id,
        newsletter: true
    });

    commonUser.password = await bcrypt.hash('dev', 10);
    await commonUser.save();

    // basic users
    for (let i = 0; i < NUMBER_OF_USERS; i++) {
        const user = new User({
            firstname: faker.person.firstName(),
            lastname: faker.person.lastName(),
            email: faker.internet.email(),
            password: 'password',
            subscription: [subscriptions[Math.floor(Math.random() * subscriptions.length)]._id],
            newsletter: Math.random() < 0.5
        });
        user.password = await bcrypt.hash(user.password, 10);

        await user.save();
    }

    console.log('Users seeded');
}

module.exports = seedUsers;