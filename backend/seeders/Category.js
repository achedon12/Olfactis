const Category = require('../models/Category');

const seedCategories = async () => {
    const categories = [
        {
            name: 'Microscopes',
            description: 'Microscopes are used to visualize objects that are too small to be seen by the naked eye. They are used in a variety of scientific fields, including biology, chemistry, and physics.',
        },
        {
            name: 'Spectrophotometers',
            description: 'Spectrophotometers are used to measure the intensity of light at different wavelengths. They are commonly used in chemistry and biology to determine the concentration of a substance in a solution.',
        },
        {
            name: 'Centrifuges',
            description: 'Centrifuges are used to separate particles from a solution based on their size, shape, and density. They are commonly used in biology and chemistry to isolate cells, proteins, and other biological molecules.',
        },
        {
            name: 'Incubators',
            description: 'Incubators are used to grow and maintain cell cultures, bacteria, and other microorganisms at a constant temperature and humidity. They are commonly used in biology and microbiology research.',
        },
        {
            name: 'Autoclaves',
            description: 'Autoclaves are used to sterilize equipment and supplies by subjecting them to high pressure and temperature steam. They are commonly used in medical and research laboratories to prevent contamination.',
        },
        {
            name: 'Lab Balances',
            description: 'Lab balances are used to measure the mass of an object with high precision. They are commonly used in chemistry, biology, and physics to determine the weight of samples and reagents.',
        },
        {
            name: 'Lab Ovens',
            description: 'Lab ovens are used to heat, dry, and sterilize samples and equipment in a controlled environment. They are commonly used in chemistry, biology, and materials science research.',
        },
        {
            name: 'Lab Refrigerators',
            description: 'Lab refrigerators are used to store samples, reagents, and other temperature-sensitive materials at a constant temperature. They are commonly used in biology, chemistry, and medical laboratories.',
        },
        {
            name: 'Lab Freezers',
            description: 'Lab freezers are used to store samples, reagents, and other temperature-sensitive materials at a constant temperature below freezing. They are commonly used in biology, chemistry, and medical laboratories.',
        },
        {
            name: 'Lab Shakers',
            description: 'Lab shakers are used to mix, agitate, and incubate samples in a controlled environment. They are commonly used in biology, chemistry, and materials science research.',
        },
        {
            name: 'Lab Stirrers',
            description: 'Lab stirrers are used to mix, dissolve, and heat samples in a controlled environment. They are commonly used in chemistry, biology, and materials science research.',
        }
    ];

    try {
        await Category.deleteMany({});
        await Category.insertMany(categories);
        console.log('Categories seeded');
    } catch (error) {
        console.error('Error seeding categories:', error);
    }
};

module.exports = seedCategories;