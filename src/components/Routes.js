const express = require('express');
const { sendExchangeRequestEmail } = require('./emailService');
const router = express.Router();

router.post('/exchange-request', (req, res) => {
    const { userId, productId, recipientEmail, exchangeDetails } = req.body;



   
    sendExchangeRequestEmail(recipientEmail, exchangeDetails);

    res.status(200).json({ message: 'Solicitud de permuta enviada y correo de notificación enviado' });
});

module.exports = router;
