const State = require('../models/State');

const seedStates = async () => {
    const states = [
        {
            name: 'Available'
        },
        {
            name: 'Booked'

        },
        {
            name: 'Returned'
        },
        {
            name: 'Asked'
        },
        {
            name: 'Damaged'
        }
    ];

    await State.deleteMany({});

    await State.insertMany(states);

    console.log('States seeded');
};

module.exports = seedStates;