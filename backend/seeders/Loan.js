const Loan = require('../models/Loan');
const User = require('../models/User');
const Item = require('../models/Item');
const State = require('../models/State');

const seedLoans = async () => {
    await Loan.deleteMany({});
    const users = await User.find();
    const items = await Item.find();
    const loanedState = await State.findOne({ name: 'LOANED' });

    const loans = [];
    for (let i = 0; i < 10; i++) {
        const user = users[Math.floor(Math.random() * users.length)];
        const item = items[Math.floor(Math.random() * items.length)];
        const start_date = new Date();
        start_date.setDate(start_date.getDate() - Math.floor(Math.random() * 30));
        const end_date = new Date(start_date);
        end_date.setDate(start_date.getDate() + Math.floor(Math.random() * 10) + 1);

        const loan = {
            user: user._id,
            item: item._id,
            start_date
        };

        if (end_date <= new Date()) {
            loan.end_date = end_date;
        }

        loans.push(loan);

        await Item.updateOne({ _id: item._id }, { state: loanedState._id });
    }

    await Loan.deleteMany({});
    await Loan.insertMany(loans);
    console.log('Loans seeded');
};

module.exports = seedLoans;