const cron = require('node-cron');
const sendReturnReminder = require('./Reminder');
const { sendNewsletter } = require('./Newsletter');

// Schedule a task to run at 8 AM on the first day of every month
cron.schedule('0 8 1 * *', async () => {
    await sendReturnReminder();
    await sendNewsletter();
}, {
    timezone: "Europe/Paris"
});

