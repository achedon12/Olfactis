const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const connectDB = require('../config/db');

const seedUsers = require('./User');

// Connect to the database
connectDB();

const seedDatabase = async () => {
    try {
        await seedUsers();
        console.log('Database seeded');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        mongoose.connection.close();
    }
};

seedDatabase();