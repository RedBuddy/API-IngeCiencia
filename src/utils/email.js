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
        subject: 'Email de verificación IngeCiencia',
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
            <h2 style="text-align: center; color: #02182b;">IngeCiencia</h2>
            <p>Hola,</p>
            <p>Gracias por registrarte en IngeCiencia. Por favor, verifica tu correo electrónico haciendo clic en el siguiente enlace:</p>
            <div style="text-align: center; margin: 20px 0;">
                <a href="http://localhost:4200/verificar-email?token=${token}" style="background-color: #003b5c; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Verificar Email</a>
            </div>
            <p >Si no puedes hacer clic en el enlace, copia y pega la token en el cuadro de verificación:</p>
            <p style="text-align: center;">${token}</p>
            <p>Gracias,</p>
            <p>El equipo de IngeCiencia</p>
        </div>
    `
};

    await transporter.sendMail(mailOptions);
};



export const sendRecoveryEmail = async (email, token) => {
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
        subject: 'Recuperación de contraseña',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                <h2 style="text-align: center; color: #02182b;">Recuperación de contraseña</h2>
                <p>Hola,</p>
                <p>Has solicitado recuperar tu contraseña. Por favor, haz clic en el siguiente enlace para restablecer tu contraseña:</p>
                <div style="text-align: center; margin: 20px 0;">
                    <a href="http://localhost:4200/reset-password?token=${token}" style="background-color: #003b5c; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Restablecer contraseña</a>
                </div>
                <p>Si no puedes hacer clic en el enlace, copia y pega la token en el cuadro de verificación:</p>
                <p><a href="http://localhost:4200/reset-password?token=${token}">${token}</a></p>
                <p>Gracias,</p>
                <p>El equipo de IngeCiencia</p>
            </div>
        `
    };

    await transporter.sendMail(mailOptions);
};