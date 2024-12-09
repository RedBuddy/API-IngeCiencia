import nodemailer from 'nodemailer';

export const sendVerificationEmail = async (email, token) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'orlandolmsm@gmail.com',
            pass: 'jkocwtwiesgrwtjz'
        }
    });

    const mailOptions = {
        from: 'orlandolmsm@gmail.com',
        to: email,
        subject: 'Email Verification',
        text: `Please verify your email by clicking the following link: http://your-domain.com/verify-email?token=${token}`
    };

    await transporter.sendMail(mailOptions);
};