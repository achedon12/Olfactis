const Category = require('../models/Category');

const seedCategories = async () => {
    const categories = [
        { name: 'Distillation', description: 'Equipment used for the distillation of essential oils and fragrance components.' },
        { name: 'Extraction', description: 'Tools and machines for extracting essential oils and fragrance compounds from raw materials.' },
        { name: 'Analysis', description: 'Scientific instruments used to analyze the chemical composition of perfumes and essential oils.' },
        { name: 'Measurement', description: 'Precision tools used to measure liquid and solid components in perfume formulation.' },
        { name: 'Mixing', description: 'Equipment used for mixing, blending, and homogenizing perfume formulations.' },
        { name: 'Glassware', description: 'Various laboratory glassware items used in perfume formulation and testing.' },
        { name: 'Testing', description: 'Materials and tools used for evaluating and testing perfume compositions.' },
        { name: 'Packaging', description: 'Machines and tools used for bottling and sealing perfume products.' }
    ];

    await Category.deleteMany({});
    await Category.insertMany(categories);

    console.log('Categories seeded');
};

module.exports = seedCategories;
