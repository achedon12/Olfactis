const Item = require('../models/Item');
const Category = require('../models/Category');
const State = require('../models/State');

const seedItems = async () => {
    const items = [
        // Distillation Equipment
        {
            name: 'Copper Alembic',
            description: 'A traditional alembic used for distilling essential oils and plant extracts.',
            picture: '71rzxQR5zZS.jpg',
            reference: 'AL-001',
            category: (await Category.findOne({ name: 'Distillation' })),
            state: (await State.findOne({ name: 'AVAILABLE' }))
        },
        {
            name: 'Glass Distillation Column',
            description: 'A column used for separating different volatile components in fragrances.',
            picture: 's-l1200.jpg',
            reference: 'DC-001',
            category: (await Category.findOne({ name: 'Distillation' })),
            state: (await State.findOne({ name: 'AVAILABLE' }))
        },

        // Extraction Equipment
        {
            name: 'Soxhlet Extractor',
            description: 'An extractor used for obtaining essential oils through solvent extraction.',
            picture: 'Y353-1000Wx1000H.jpeg',
            reference: 'SE-001',
            category: (await Category.findOne({ name: 'Extraction' })),
            state: (await State.findOne({ name: 'AVAILABLE' }))
        },
        {
            name: 'Cold Press Extractor',
            description: 'Used to extract essential oils from citrus peels through mechanical pressing.',
            picture: '85MM-COLD-PRESS-MACHINE-PERSSEH-01.jpg',
            reference: 'CP-001',
            category: (await Category.findOne({ name: 'Extraction' })),
            state: (await State.findOne({ name: 'AVAILABLE' }))
        },
        {
            name: 'Enfleurage Frame',
            description: 'A traditional tool for capturing delicate floral scents using fat absorption.',
            picture: '135248478_10159215592843854_2149583267344232241_n.jpg',
            reference: 'EF-001',
            category: (await Category.findOne({ name: 'Extraction' })),
            state: (await State.findOne({ name: 'AVAILABLE' }))
        },

        // Analysis Equipment
        {
            name: 'Gas Chromatograph',
            description: 'A scientific instrument used to analyze the chemical composition of perfumes.',
            picture: '2587-202206161627434666.jpg',
            reference: 'GC-001',
            category: (await Category.findOne({ name: 'Analysis' })),
            state: (await State.findOne({ name: 'AVAILABLE' }))
        },
        {
            name: 'Mass Spectrometer',
            description: 'Used to precisely identify the odorant molecules in a fragrance.',
            picture: 'Mass-Spectrometry-Instruments-6.jpg',
            reference: 'MS-001',
            category: (await Category.findOne({ name: 'Analysis' })),
            state: (await State.findOne({ name: 'AVAILABLE' }))
        },
        {
            name: 'pH Meter',
            description: 'A digital instrument used to measure the pH of liquid solutions in formulations.',
            picture: '2587-202410241343569022.jpg',
            reference: 'PH-001',
            category: (await Category.findOne({ name: 'Analysis' })),
            state: (await State.findOne({ name: 'AVAILABLE' }))
        },

        // Measurement Tools
        {
            name: 'Precision Scale',
            description: 'A high-accuracy scale for weighing raw materials in perfume formulation.',
            picture: 'balance-de-precision-prz-15493-1.png',
            reference: 'PS-001',
            category: (await Category.findOne({ name: 'Measurement' })),
            state: (await State.findOne({ name: 'AVAILABLE' }))
        },
        {
            name: 'Hydrometer',
            description: 'An instrument used to measure the alcohol concentration in perfume mixtures.',
            picture: 'cole-parmer-0829815-0-890-1-000-specific-gravity-hydrometer-for-liquids-lighter-than-water-0829815.jpg',
            reference: 'HY-001',
            category: (await Category.findOne({ name: 'Measurement' })),
            state: (await State.findOne({ name: 'AVAILABLE' }))
        },

        // Mixing & Formulation Equipment
        {
            name: 'Magnetic Stirrer',
            description: 'A device used to mix liquid solutions homogeneously in perfume production.',
            picture: 'LN36-1-01-1000Wx1000H.jpeg',
            reference: 'MS-002',
            category: (await Category.findOne({ name: 'Mixing' })),
            state: (await State.findOne({ name: 'AVAILABLE' }))
        },
        {
            name: 'Ultrasonic Homogenizer',
            description: 'Used to break down and mix fragrance molecules evenly in a solution.',
            picture: '61+7ojLXY1L._AC_UF1000,1000_QL80_.jpg',
            reference: 'UH-001',
            category: (await Category.findOne({ name: 'Mixing' })),
            state: (await State.findOne({ name: 'AVAILABLE' }))
        },

        // Glassware & Containers
        {
            name: 'Graduated Cylinders Set',
            description: 'A set of glass measuring cylinders for precise liquid volume measurement.',
            picture: '71gyyY5MixL.jpg',
            reference: 'GCY-001',
            category: (await Category.findOne({ name: 'Glassware' })),
            state: (await State.findOne({ name: 'AVAILABLE' }))
        },
        {
            name: 'Pipette Set',
            description: 'A set of precision pipettes used for measuring and transferring liquid fragrance components.',
            picture: 'F214462_p.eps-650.png',
            reference: 'PIP-001',
            category: (await Category.findOne({ name: 'Glassware' })),
            state: (await State.findOne({ name: 'AVAILABLE' }))
        },
        {
            name: 'Erlenmeyer Flask Set',
            description: 'A set of flasks used for mixing and storing liquid perfume formulations.',
            picture: '4980-PACK_A.jpg-650.png',
            reference: 'EF-002',
            category: (await Category.findOne({ name: 'Glassware' })),
            state: (await State.findOne({ name: 'AVAILABLE' }))
        },

        // Testing & Packaging Equipment
        {
            name: 'Fragrance Testing Strips',
            description: 'Absorbent paper strips used for testing and evaluating perfume compositions.',
            picture: 'EQFOSTRIPUS983-fragrance-test-strip.jpg',
            reference: 'FTS-001',
            category: (await Category.findOne({ name: 'Testing' })),
            state: (await State.findOne({ name: 'AVAILABLE' }))
        },
        {
            name: 'Perfume Bottling Machine',
            description: 'A semi-automatic machine for filling perfume bottles with precise measurements.',
            picture: 'Vacuum_Filler-1.png',
            reference: 'PBM-001',
            category: (await Category.findOne({ name: 'Packaging' })),
            state: (await State.findOne({ name: 'AVAILABLE' }))
        },
        {
            name: 'Bottle Capping Machine',
            description: 'A machine used to securely seal perfume bottles with caps or spray heads.',
            picture: '51ukTEAWZaL.jpg',
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
