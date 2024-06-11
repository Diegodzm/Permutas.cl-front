
import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { Form, Button } from "react-bootstrap";
import "./EmailForm.css";

const EmailForm = () => {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [mensaje, setMensaje] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const serviceId = 'service_l8rq83q';
        const templateId = 'template_g3hfj69';
        const publicKey = 'M7o16k3kuohz-1JWp';

        const templateParams = {
            from_name: nombre,
            message: `Email: ${email}\nTeléfono: ${telefono}\nMensaje: ${mensaje}`,
        };

        emailjs.send(serviceId, templateId, templateParams, publicKey)
            .then((response) => {
                console.log('Email enviado correctamente', response);
                setNombre('');
                setEmail('');
                setTelefono('');
                setMensaje('');
                alert('Mensaje enviado correctamente'); 
            })
            .catch((error) => {
                console.error('Error al enviar correo', error);
            });
    };

    return (
        <div className="email-container">
            <div className="background" />
            <Form onSubmit={handleSubmit} className="email-form mt-4">
                <h2>Contacto</h2>
                <Form.Group controlId="formNombre">
                    <Form.Control
                        type="text"
                        placeholder="Tu Nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formEmail">
                    <Form.Control
                        type="email"
                        placeholder="Correo Electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formTelefono">
                    <Form.Control
                        type="tel"
                        placeholder="Teléfono"
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formMensaje">
                    <Form.Control
                        as="textarea"
                        rows={5}
                        placeholder="Mensaje"
                        value={mensaje}
                        onChange={(e) => setMensaje(e.target.value)}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Enviar Mensaje
                </Button>
            </Form>
        </div>
    );
};

export default EmailForm;
