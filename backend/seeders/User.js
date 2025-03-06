const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const NUMBER_OF_USERS = 50;

const seedUsers = async () => {
    await User.deleteMany({});

    // adminUser
    const adminUser = new User({
        firstname: 'admin',
        lastname: 'admin',
        email: 'admin@gmail.com',
        password: 'password'
    });

    adminUser.password = await bcrypt.hash('admin', 10);
    await adminUser.save();

    // basic users
    for (let i = 0; i < NUMBER_OF_USERS; i++) {
        const user = new User({
            firstname: faker.person.firstName(),
            lastname: faker.person.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password()
        });
        user.password = await bcrypt.hash(user.password, 10);

        await user.save();
    }

    console.log('Users seeded');
}

module.exports = seedUsers;