import React, { useContext } from 'react';
import { Context } from '../store/context';

const Intercambio = () => {
    const { actions } = useContext(Context);
    const userId = 1; 
    const productId = 1; 
    const recipientEmail = 'destinatario@example.com'; 
    const exchangeDetails = 'Detalles del intercambio'; 

    const handleRequest = () => {
        actions.handleExchangeRequest(userId, productId, recipientEmail, exchangeDetails);
    };

    return (
        <div>
            <h1>Solicitar Permuta</h1>
            <button onClick={handleRequest}>Enviar Solicitud</button>
        </div>
    );
};

export default Intercambio;
