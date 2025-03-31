const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const connectDB = require('../config/db');

const seedUsers = require('./User');
const seedCategories = require('./Category');
const seedItems = require('./Item');
const seedStates = require('./State');
const seedSubscriptions = require('./Subscription');
const seedUsersSubscription = require('./UserSubscription');

// Connect to the database
connectDB();

const seedDatabase = async () => {
    try {
        await seedCategories();
        await seedSubscriptions();
        await seedUsers();
        await seedUsersSubscription();
        await seedStates();
        await seedItems();
        console.log('Database seeded');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        mongoose.connection.close();
    }
};

seedDatabase();