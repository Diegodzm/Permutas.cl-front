import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { Context } from "../store/context";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [validated, set_Validated] = useState(false);
    const [form_Data, set_Form_Data] = useState({
        username: "",
        firstname: "",
        lastname: "",
        password: "",
        confimPass: "",
        email: "",
    });

    const submitFn = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        set_Validated(true);
        

        if (form.checkValidity()) {
            store.user = form_Data;
            actions.handleSubmituser()
            .then(response => { if (response) { navigate('/') } })
            .catch(error => console.log(error));
        }
    };

    const chngFn = (event) => {
        const { name, value } = event.target;
        set_Form_Data({
            ...form_Data,
            [name]: value,
        });
        actions.handleOnchange(event);
        console.log(store.user);
    };

    return (
        <div className="register-container">
            <div />
            <Container className="mt-5">
                <Row>
                    <Col
                        md={{
                            span: 6,
                            offset: 3,
                        }}>
                        <Form noValidate validated={validated} onSubmit={submitFn}>
                            <Form.Group className="mt-2 mb-2" controlId="username">
                                <Form.Label>Nombre de usuario</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="username"
                                    value={form_Data.username}
                                    onChange={chngFn}
                                    pattern="^[a-zA-Z0-9]+$"
                                    required
                                    isInvalid={
                                        validated &&
                                        !/^[a-zA-Z0-9]+$/.test(form_Data.username)
                                    }
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter a valid username (alphanumeric characters only).
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mt-2 mb-2" controlId="firstname">
                                <Form.Label>Nombres</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="firstname"
                                    value={form_Data.firstname}
                                    onChange={chngFn}
                                    pattern="^[a-zA-Z]+$"
                                    required
                                    isInvalid={
                                        validated &&
                                        !/^[a-zA-Z]+$/.test(form_Data.firstname)
                                    }
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter a valid firstname (characters only).
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mt-2 mb-2" controlId="lastname">
                                <Form.Label>Apellidos</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="lastname"
                                    value={form_Data.lastname}
                                    onChange={chngFn}
                                    pattern="^[a-zA-Z]+$"
                                    required
                                    isInvalid={
                                        validated &&
                                        !/^[a-zA-Z]+$/.test(form_Data.lastname)
                                    }
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter a valid lastname (characters only).
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mt-2 mb-2" controlId="password">
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    value={form_Data.password}
                                    onChange={chngFn}
                                    minLength={6}
                                    required
                                    isInvalid={
                                        validated && form_Data.password.length < 6
                                    }
                                />
                                <Form.Control.Feedback type="invalid">
                                    Password must be at least 6 characters long.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mt-2 mb-2" controlId="confirmPassword">
                                <Form.Label>Confirmar Contraseña</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="confimPass"
                                    value={form_Data.confimPass}
                                    onChange={chngFn}
                                    minLength={6}
                                    required
                                    isInvalid={
                                        validated &&
                                        form_Data.confimPass !== form_Data.password
                                    }
                                />
                                <Form.Control.Feedback type="invalid">
                                    Passwords do not match.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mt-2 mb-2" controlId="email">
                                <Form.Label>Correo</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={form_Data.email}
                                    onChange={chngFn}
                                    required
                                    isInvalid={
                                        validated &&
                                        !/^\S+@\S+\.\S+$/.test(form_Data.email)
                                    }
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter a valid email address.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Button className="btn btn-primary" style={{ backgroundColor: '#426B1F' }} type="submit">Registrarse</Button>
                            <Link to='/'></Link>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Register;
