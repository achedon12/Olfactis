const State = require('../models/State');

const seedStates = async () => {
    const states = [
        { name: 'AVAILABLE' },
        { name: 'BOOKED' },
        { name: 'LOANED' },
        { name: 'RETURNED' }
    ]

    await State.deleteMany({});

    await State.insertMany(states);

    console.log('States seeded');
};

module.exports = seedStates;