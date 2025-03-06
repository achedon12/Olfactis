const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'localhost',
    port: 1030,
});

const sendMail = async (to, subject, templateFile, replacements) => {
    const templatePath = path.join(__dirname, '../templates/emails', templateFile);
    fs.readFile(templatePath, 'utf8', async (err, data) => {
        if (err) {
            console.error('Error reading email template:', err);
            return;
        }

        let html = data;
        for (const key in replacements) {
            html = html.replace(new RegExp(`{{${key}}}`, 'g'), replacements[key]);
        }
        html = html.replace(/{{now}}/g, new Date().getFullYear());

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: to,
            subject: subject,
            html: html
        };

        try {
            await transporter.sendMail(mailOptions);
        } catch (error) {
            console.error('Error sending email to ' + to + ':', error);
        }
    });
};

module.exports = sendMail;