const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
        const info = await transporter.sendMail({
            from: `"Vanguard Apparel" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text,
        });
        console.log('📧 Email sent: %s', info.messageId);
    } catch (error) {
        console.error('❌ Email failed to send:', error);
        throw error;
    }
};

module.exports = sendEmail;