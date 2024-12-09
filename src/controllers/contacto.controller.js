import nodemailer from 'nodemailer';
import User from '../database/models/Users';

export const sendContactEmail = async (req, res) => {
    try {
        const { user_id, email_to, subject, message } = req.body;

        // Buscar el usuario por ID
        const user = await User.findByPk(user_id);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const { first_name, last_name, email: email_from } = user;

        // Configurar el transporte de nodemailer
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'orlandolmsm@gmail.com',
                pass: 'jkocwtwiesgrwtjz'
            }
        });

        // Configurar las opciones del correo electrónico
        const mailOptions = {
            from: email_from,
            to: email_to, 
            subject: `Contacto IngeCiencia: ${subject}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                    <h2 style="text-align: center; color: #003b5c;">Mensaje de contacto desde IngeCiencia</h2>
                    <p><strong>Nombre:</strong> ${first_name} ${last_name}</p>
                    <p><strong>Email:</strong> ${email_from}</p>
                    <p><strong>Asunto:</strong> ${subject}</p>
                    <p><strong>Mensaje:</strong></p>
                    <p>${message}</p>
                </div>
            `
        };

        // Enviar el correo electrónico
        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Correo enviado exitosamente' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};