const Item = require('../models/Item');
const Category = require('../models/Category');
const State = require('../models/State');

const seedItems  = async () => {
    const items = [
        {
            name: 'Compound Microscope',
            description: 'A compound microscope is an optical microscope that uses multiple lenses to magnify the image of a small object. It is commonly used in biology, chemistry, and materials science research.',
            picture: 'https://via.placeholder.com/150',
            reference: 'CM-001',
            categoryId: (await Category.findOne({ name: 'Microscopes' }))._id,
            stateId: (await State.findOne({ name: 'Available' }))._id
        },
        {
            name: 'UV-Vis Spectrophotometer',
            description: 'A UV-Vis spectrophotometer is a scientific instrument that measures the intensity of light at different wavelengths. It is commonly used in chemistry and biology to determine the concentration of a substance in a solution.',
            picture: 'https://via.placeholder.com/150',
            reference: 'UV-001',
            categoryId: (await Category.findOne({ name: 'Spectrophotometers' }))._id,
            stateId: (await State.findOne({ name: 'Available' }))._id
        },
        {
            name: 'Refrigerated Centrifuge',
            description: 'A refrigerated centrifuge is a laboratory instrument that spins samples at high speeds to separate particles based on their size, shape, and density. It is commonly used in biology and chemistry research.',
            picture: 'https://via.placeholder.com/150',
            reference: 'RC-001',
            categoryId: (await Category.findOne({ name: 'Centrifuges' }))._id,
            stateId: (await State.findOne({ name: 'Available' }))._id
        },
        {
            name: 'CO2 Incubator',
            description: 'A CO2 incubator is a laboratory instrument that provides a controlled environment for cell culture, bacteria, and other microorganisms. It is commonly used in biology and microbiology research.',
            picture: 'https://via.placeholder.com/150',
            reference: 'CI-001',
            categoryId: (await Category.findOne({ name: 'Incubators' }))._id,
            stateId: (await State.findOne({ name: 'Available' }))._id
        },
        {
            name: 'Autoclave Sterilizer',
            description: 'An autoclave sterilizer is a laboratory instrument that uses high pressure and temperature steam to sterilize equipment and supplies. It is commonly used in medical and research laboratories.',
            picture: 'https://via.placeholder.com/150',
            reference: 'AS-001',
            categoryId: (await Category.findOne({ name: 'Autoclaves' }))._id,
            stateId: (await State.findOne({ name: 'Available' }))._id
        },
    ];

    await Item.deleteMany({});

    await Item.insertMany(items);

    console.log('Items seeded');
};

module.exports = seedItems;