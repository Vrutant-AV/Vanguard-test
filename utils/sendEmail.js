const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: process.env.SMTP_SECURE === 'true',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });
        await transporter.sendMail({
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