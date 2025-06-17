const State = require('../models/State');

const seedStates = async () => {
    const states = [
        { name: 'AVAILABLE' },
        { name: 'LOANED' },
    ]

    await State.deleteMany({});
    await State.insertMany(states);

    console.log('States seeded');
};

module.exports = seedStates;