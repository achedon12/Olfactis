const Item = require('../models/Item');
const Category = require('../models/Category');
const State = require('../models/State');

const seedItems = async () => {
    const items = [
        // Distillation Equipment
        {
            name: 'Copper Alembic',
            description: '/items/copper_alembic.png',
            reference: 'AL-001',
            category: (await Category.findOne({name: 'Distillation'})),
            state: (await State.findOne({name: 'AVAILABLE'}))
        },
        {
            name: 'Glass Distillation Column',
            description: '/items/glass_distillation_olumn.png',
            reference: 'DC-001',
            category: (await Category.findOne({name: 'Distillation'})),
            state: (await State.findOne({name: 'AVAILABLE'}))
        },

        // Extraction Equipment
        {
            name: 'Soxhlet Extractor',
            description: '/items/soxhlet_extractor.png',
            reference: 'SE-001',
            category: (await Category.findOne({name: 'Extraction'})),
            state: (await State.findOne({name: 'AVAILABLE'}))
        },
        {
            name: 'Cold Press Extractor',
            description: '/items/cold_press_extractor.png',
            reference: 'CP-001',
            category: (await Category.findOne({name: 'Extraction'})),
            state: (await State.findOne({name: 'AVAILABLE'}))
        },
        {
            name: 'Enfleurage Frame',
            description: '/items/enfleurage_frame.png',
            reference: 'EF-001',
            category: (await Category.findOne({name: 'Extraction'})),
            state: (await State.findOne({name: 'AVAILABLE'}))
        },

        // Analysis Equipment
        {
            name: 'Gas Chromatograph',
            description: '/items/gas_chromatograph.png',
            reference: 'GC-001',
            category: (await Category.findOne({name: 'Analysis'})),
            state: (await State.findOne({name: 'AVAILABLE'}))
        },
        {
            name: 'Mass Spectrometer',
            description: '/items/mass_spectrometer.png',
            reference: 'MS-001',
            category: (await Category.findOne({name: 'Analysis'})),
            state: (await State.findOne({name: 'AVAILABLE'}))
        },
        {
            name: 'pH Meter',
            description: '/items/pH_meter.png',
            reference: 'PH-001',
            category: (await Category.findOne({name: 'Analysis'})),
            state: (await State.findOne({name: 'AVAILABLE'}))
        },

        // Measurement Tools
        {
            name: 'Precision Scale',
            description: '/items/precision_scale.png',
            reference: 'PS-001',
            category: (await Category.findOne({name: 'Measurement'})),
            state: (await State.findOne({name: 'AVAILABLE'}))
        },
        {
            name: 'Hydrometer',
            description: '/items/hydrometer.png',
            reference: 'HY-001',
            category: (await Category.findOne({name: 'Measurement'})),
            state: (await State.findOne({name: 'AVAILABLE'}))
        },

        // Mixing & Formulation Equipment
        {
            name: 'Magnetic Stirrer',
            description: '/items/magnetic_stirrer.png',
            reference: 'MS-002',
            category: (await Category.findOne({name: 'Mixing'})),
            state: (await State.findOne({name: 'AVAILABLE'}))
        },
        {
            name: 'Ultrasonic Homogenizer',
            description: '/items/ultrasonic_homogenizer.png',
            reference: 'UH-001',
            category: (await Category.findOne({name: 'Mixing'})),
            state: (await State.findOne({name: 'AVAILABLE'}))
        },

        // Glassware & Containers
        {
            name: 'Graduated Cylinders Set',
            description: '/items/graduated_cylinders Set.png',
            reference: 'GCY-001',
            category: (await Category.findOne({name: 'Glassware'})),
            state: (await State.findOne({name: 'AVAILABLE'}))
        },
        {
            name: 'Pipette Set',
            description: '/items/pipette_set.png',
            reference: 'PIP-001',
            category: (await Category.findOne({name: 'Glassware'})),
            state: (await State.findOne({name: 'AVAILABLE'}))
        },
        {
            name: 'Erlenmeyer Flask Set',
            description: '/items/erlenmeyer_flask_set.png',
            reference: 'EF-002',
            category: (await Category.findOne({name: 'Glassware'})),
            state: (await State.findOne({name: 'AVAILABLE'}))
        },

        // Testing & Packaging Equipment
        {
            name: 'Fragrance Testing Strips',
            description: '/items/fragrance_testing_strips.png',
            reference: 'FTS-001',
            category: (await Category.findOne({name: 'Testing'})),
            state: (await State.findOne({name: 'AVAILABLE'}))
        },
        {
            name: 'Perfume Bottling Machine',
            description: '/items/perfume_bottling_machine.png',
            reference: 'PBM-001',
            category: (await Category.findOne({name: 'Packaging'})),
            state: (await State.findOne({name: 'AVAILABLE'}))
        },
        {
            name: 'Bottle Capping Machine',
            description: '/items/bottle_capping_machine.png',
            reference: 'BCM-001',
            category: (await Category.findOne({name: 'Packaging'})),
            state: (await State.findOne({name: 'AVAILABLE'}))
        }
    ];

    await Item.deleteMany({});
    await Item.insertMany(items);

    console.log('Items seeded');
};

module.exports = seedItems;
