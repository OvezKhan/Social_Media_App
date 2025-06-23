const nodemailer = require('nodemailer');

exports.sendEmail = async (options) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            
            auth: {
                user:"ffc970f483eec3",
                pass: "95bbb3484e6eb7"  // Corrected field name
            },
            secure: false,   // Set to false since Mailtrap uses plain SMTP
            tls: {
                rejectUnauthorized: false  // Avoid self-signed certificate errors
            }
        });

        const mailOptions = {
            from: process.env.SMTP_EMAIL,
            to: options.email,
            subject: options.subject,
            text: options.message,
        };

        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully!");
    } catch (error) {
        console.error("Error sending email:", error.message);
    }
};
