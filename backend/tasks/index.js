const cron = require('node-cron');
const sendReturnReminder = require('./Reminder');


cron.schedule('0 8 1 * *', async () => {
    await sendReturnReminder();
}, {
    timezone: "Europe/Paris"
});
