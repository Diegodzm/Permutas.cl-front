import React, { useContext } from 'react';
import { Context } from '../store/context';

const ContactoPermutas = () => {
    const { store, actions } = useContext(Context);

    const handleEnviarMensaje = () => {
        actions.enviarMensaje();
    };

    return (
        <div className="container mt-5">
            <h1>Contacto para Permutas</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="mensaje" className="form-label">Mensaje:</label>
                    <textarea
                        className="form-control"
                        id="mensaje"
                        name="mensaje"
                        value={store.contacto.mensaje}
                        onChange={actions.handleContactoChange}
                        rows="4"
                        required
                    ></textarea>
                </div>
                <button type="button" className="btn btn-primary" onClick={handleEnviarMensaje}>
                    Enviar Mensaje
                </button>
            </form>
        </div>
    );
};

export default ContactoPermutas;
