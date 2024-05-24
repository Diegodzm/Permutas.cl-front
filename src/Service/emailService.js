const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
        user: 'permutas1.cl@gmail.com', 
        pass: 'Proyecto1@' 
    }
});

const sendExchangeRequestEmail = (recipientEmail, exchangeDetails) => {
    const mailOptions = {
        from: 'permutas1.cl@gmail.com',
        to: recipientEmail,
        subject: 'Nueva Solicitud de Permuta en Permutas.cl',
        text: `Has recibido una nueva solicitud de permutas.cl\n\nDetalles del intercambio:\n${exchangeDetails}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error al enviar el correo:', error);
        } else {
            console.log('Correo enviado:', info.response);
        }
    });
};

module.exports = { sendExchangeRequestEmail };
