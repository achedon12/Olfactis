const Loan = require('../models/Loan');
const sendMail = require("../utils/mailer");

async function sendReturnReminder() {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);

    console.log(`Sending return reminders for loans due after ${today.toISOString()}...`);

    const loans = await Loan.find({
        end_date: {$gte: today}
    }).populate('user').populate('item');

    if (loans.length === 0) {
        console.log('No loans to remind for this period.');
        return;
    }

    const userLoans = {};
    loans.forEach(loan => {
        const email = loan.user.email;
        if (!userLoans[email]) userLoans[email] = [];
        userLoans[email].push(loan);
    });

    try {
        for (const email in userLoans) {
            console.log(`Sending reminder to ${email}...`);
            const userLoanList = userLoans[email];
            const subject = `Reminder: Items to return soon`;
            await sendMail(email, subject, 'return_reminder.twig', {
                loans: userLoanList,
                today: today.toLocaleDateString('en-GB')
            }, true);
        }
    } catch (error) {
        console.error('Error sending return reminders:', error);
    }
}

module.exports = sendReturnReminder;