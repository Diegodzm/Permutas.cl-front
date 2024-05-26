import React, { useState } from "react";
import emailjs from "@emailjs/browser";

const EmailForm = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handlesubmit = (e) => {
      e.preventDefault();

      const serviceId = 'service_l8rq83q';
      const templateId = 'template_g3hfj69';
      const publicKey = 'M7o16k3kuohz-1JWp';
      
      const templateParams = {
        from_name: name,
        from_email: email,
        to_name: 'Permutas.cl',
        message: message,
      };

      emailjs.send(serviceId, templateId, templateParams, publicKey)
        .then((response) => {
            console.log('Email enviado correctamente', response);
            setName('');
            setEmail('');
        })
        .catch((error) => {
            console.error('error al enviar correo', error);
        });


    }

    setMessage ('Estiamdo' + name + ', le ha llegado una oferta desde permutas.cl')

    return (


        <form onSubmit={handlesubmit} className="emailform">
            <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
                <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit">Enviar Mensaje</button>
        
        </form>


    )
}

export default EmailForm