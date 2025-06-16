const Item = require('../models/Item');
const Category = require('../models/Category');
const State = require('../models/State');

const seedItems = async () => {
    const items = [
        // Distillation Equipment
        {
            name: 'Copper Alembic',
            description: 'A traditional alembic used for distilling essential oils and plant extracts.',
            picture: '/items/copper_alembic.png',
            reference: 'AL-001',
            category: (await Category.findOne({ name: 'Distillation' })),
            state: (await State.findOne({ name: 'AVAILABLE' }))
        },
        {
            name: 'Glass Distillation Column',
            description: 'A column used for separating different volatile components in fragrances.',
            picture: '/items/glass_distillation_column.png',
            reference: 'DC-001',
            category: (await Category.findOne({ name: 'Distillation' })),
            state: (await State.findOne({ name: 'AVAILABLE' }))
        },

        // Extraction Equipment
        {
            name: 'Soxhlet Extractor',
            description: 'An extractor used for obtaining essential oils through solvent extraction.',
            picture: '/items/soxhlet_extractor.png',
            reference: 'SE-001',
            category: (await Category.findOne({ name: 'Extraction' })),
            state: (await State.findOne({ name: 'AVAILABLE' }))
        },
        {
            name: 'Cold Press Extractor',
            description: 'Used to extract essential oils from citrus peels through mechanical pressing.',
            picture: '/items/cold_press_extractor.png',
            reference: 'CP-001',
            category: (await Category.findOne({ name: 'Extraction' })),
            state: (await State.findOne({ name: 'AVAILABLE' }))
        },
        {
            name: 'Enfleurage Frame',
            description: 'A traditional tool for capturing delicate floral scents using fat absorption.',
            picture: '/items/enfleurage_frame.png',
            reference: 'EF-001',
            category: (await Category.findOne({ name: 'Extraction' })),
            state: (await State.findOne({ name: 'AVAILABLE' }))
        },

        // Analysis Equipment
        {
            name: 'Gas Chromatograph',
            description: 'A scientific instrument used to analyze the chemical composition of perfumes.',
            picture: '/items/gas_chromatograph.png',
            reference: 'GC-001',
            category: (await Category.findOne({ name: 'Analysis' })),
            state: (await State.findOne({ name: 'AVAILABLE' }))
        },
        {
            name: 'Mass Spectrometer',
            description: 'Used to precisely identify the odorant molecules in a fragrance.',
            picture: '/items/mass_spectrometer.png',
            reference: 'MS-001',
            category: (await Category.findOne({ name: 'Analysis' })),
            state: (await State.findOne({ name: 'AVAILABLE' }))
        },
        {
            name: 'pH Meter',
            description: 'A digital instrument used to measure the pH of liquid solutions in formulations.',
            picture: '/items/ph_meter.png',
            reference: 'PH-001',
            category: (await Category.findOne({ name: 'Analysis' })),
            state: (await State.findOne({ name: 'AVAILABLE' }))
        },

        // Measurement Tools
        {
            name: 'Precision Scale',
            description: 'A high-accuracy scale for weighing raw materials in perfume formulation.',
            picture: '/items/precision_scale.png',
            reference: 'PS-001',
            category: (await Category.findOne({ name: 'Measurement' })),
            state: (await State.findOne({ name: 'AVAILABLE' }))
        },
        {
            name: 'Hydrometer',
            description: 'An instrument used to measure the alcohol concentration in perfume mixtures.',
            picture: '/items/hydrometer.png',
            reference: 'HY-001',
            category: (await Category.findOne({ name: 'Measurement' })),
            state: (await State.findOne({ name: 'AVAILABLE' }))
        },

        // Mixing & Formulation Equipment
        {
            name: 'Magnetic Stirrer',
            description: 'A device used to mix liquid solutions homogeneously in perfume production.',
            picture: '/items/magnetic_stirrer.png',
            reference: 'MS-002',
            category: (await Category.findOne({ name: 'Mixing' })),
            state: (await State.findOne({ name: 'AVAILABLE' }))
        },
        {
            name: 'Ultrasonic Homogenizer',
            description: 'Used to break down and mix fragrance molecules evenly in a solution.',
            picture: '/items/ultrasonic_homogenizer.png',
            reference: 'UH-001',
            category: (await Category.findOne({ name: 'Mixing' })),
            state: (await State.findOne({ name: 'AVAILABLE' }))
        },

        // Glassware & Containers
        {
            name: 'Graduated Cylinders Set',
            description: 'A set of glass measuring cylinders for precise liquid volume measurement.',
            picture: '/items/graduated_cylinders_set.png',
            reference: 'GCY-001',
            category: (await Category.findOne({ name: 'Glassware' })),
            state: (await State.findOne({ name: 'AVAILABLE' }))
        },
        {
            name: 'Pipette Set',
            description: 'A set of precision pipettes used for measuring and transferring liquid fragrance components.',
            picture: '/items/pipette_set.png',
            reference: 'PIP-001',
            category: (await Category.findOne({ name: 'Glassware' })),
            state: (await State.findOne({ name: 'AVAILABLE' }))
        },
        {
            name: 'Erlenmeyer Flask Set',
            description: 'A set of flasks used for mixing and storing liquid perfume formulations.',
            picture: '/items/erlenmeyer_flask_set.png',
            reference: 'EF-002',
            category: (await Category.findOne({ name: 'Glassware' })),
            state: (await State.findOne({ name: 'AVAILABLE' }))
        },

        // Testing & Packaging Equipment
        {
            name: 'Fragrance Testing Strips',
            description: 'Absorbent paper strips used for testing and evaluating perfume compositions.',
            picture: '/items/fragrance_testing_strips.png',
            reference: 'FTS-001',
            category: (await Category.findOne({ name: 'Testing' })),
            state: (await State.findOne({ name: 'AVAILABLE' }))
        },
        {
            name: 'Perfume Bottling Machine',
            description: 'A semi-automatic machine for filling perfume bottles with precise measurements.',
            picture: '/items/perfume_bottling_machine.png',
            reference: 'PBM-001',
            category: (await Category.findOne({ name: 'Packaging' })),
            state: (await State.findOne({ name: 'AVAILABLE' }))
        },
        {
            name: 'Bottle Capping Machine',
            description: 'A machine used to securely seal perfume bottles with caps or spray heads.',
            picture: '/items/bottle_capping_machine.png',
            reference: 'BCM-001',
            category: (await Category.findOne({ name: 'Packaging' })),
            state: (await State.findOne({ name: 'AVAILABLE' }))
        }
    ];

    await Item.deleteMany({});
    await Item.insertMany(items);

    console.log('Items seeded');
};

module.exports = seedItems;
