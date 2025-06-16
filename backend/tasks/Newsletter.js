const User = require('../models/User');
const Item = require('../models/Item');
const sendMail = require("../utils/mailer");

async function sendNewsletter() {
    const users = await getUsersForNewsletter();
    const now = new Date();
    for (const user of users) {
        const item = await getRandomItem();
        if (!item) {
            console.log('No items available for the newsletter.');
            continue;
        }

        try {
            await sendMail(user.email, `Newsletter - Your Daily Item - ${now.toLocaleDateString('en-US', { month: 'long' })}`, 'newsletter.twig', {
                item: item,
                appUrl: process.env.APP_URL,
                user: user,
                date: now.toLocaleDateString('fr-FR', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })
            },true);
        } catch (error) {
            console.error(`Failed to send newsletter to ${user.email}:`, error);
        }
    }
}

async function getUsersForNewsletter() {
    const users = await User.find({
        newsletter: true,
        email: { $exists: true, $ne: '' }
    }).select('email firstname lastname');

    if (users.length === 0) {
        console.log('No users subscribed to the newsletter.');
        return [];
    }

    return users.map(user => ({
        email: user.email,
        name: user.firstname + ' ' + user.lastname
    }));
}

async function getRandomItem() {
    const items = await Item.find({}).limit(100);
    if (items.length === 0) {
        return null;
    }
    const randomIndex = Math.floor(Math.random() * items.length);
    return items[randomIndex];
}

module.exports = {
    sendNewsletter,
    getUsersForNewsletter
}