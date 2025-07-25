const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const connectDB = require('../config/db');
const Loan = require('../models/Loan');
const LoanReturned = require('../models/LoanReturned');
const Booking = require('../models/Booking');

const seedUsers = require('./User');
const seedCategories = require('./Category');
const seedItems = require('./Item');
const seedStates = require('./State');
const seedSubscriptions = require('./Subscription');
const seedUsersSubscription = require('./UserSubscription');
const seedLoan = require('./Loan');

connectDB();

const seedDatabase = async () => {
    try {
        await Booking.deleteMany({});
        await LoanReturned.deleteMany({});
        await seedCategories();
        await seedSubscriptions();
        await seedUsers();
        await seedUsersSubscription();
        await seedStates();
        await seedItems();
        await seedLoan();
        console.log('Database seeded');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        await mongoose.connection.close();
    }
};

seedDatabase();