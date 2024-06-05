import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { Context } from "../store/context";
import { useContext } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import UploadWidget from "./UploadWidget";

const ProductUploadForm = () => {
    const { actions } = useContext(Context);
    const [validated, set_Validated] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [formData, setFormData] = useState({
        name: "",
        photo: "",
        price: 25000,
        product_info: "",
        brand: "",
        category_id: 0,
    });
    useEffect(() => {
        actions.accessTokenExpired()

    }, []);
    const navigate = useNavigate()
    const categoryOnchange = (e) => {
        const index = e.target.selectedIndex;
        actions.setCategory(index)
        return index


    }


    const submitProduct = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();

        console.log("Formulario enviado");
        console.log("Validación del formulario:", form.checkValidity());
        console.log("Datos del formulario:", formData);

        if (form.checkValidity() === false || !formData.photo) {
            set_Validated(true);

            if (!formData.photo) {
                setErrorMessage('Por favor, sube una foto del producto.');
            } else {
                setErrorMessage('');
            }

            return;
        }

        set_Validated(true);

        if (set_Validated) {
            actions.ProductUpload()
                .then(response => { if (response) { navigate('/') } })
        }
    }

    const chngProduct = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
        actions.handleProductOnChange(event);
    };

    function currencyFormatter(value) {
        const formatter = new Intl.NumberFormat('es-CL', {
          style: 'currency',
          currency: 'CLP'
        });
        return formatter.format(value);
      }
      

    return (
        <Container className="mt-5">
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <Form noValidate validated={validated} onSubmit={submitProduct}>
                        <Form.Group className="mt-2 mb-2" controlId="name">
                            <Form.Label>Nombre del producto</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={chngProduct}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Por favor ingresa un nombre para tu producto.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mt-2 mb-2" controlId="price">
                            <Form.Label>Avaluación CL$</Form.Label>
                            <Form.Control
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={chngProduct}
                                required
                            />
                         
                            <Form.Control.Feedback type="invalid">
                                Ingrese una avaluación de su producto.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Select
                            onChange={categoryOnchange}
                            className="mt-4 mb-3"
                            aria-label="Default select example"
                            required
                        >
                            <option>Categoria del producto</option>
                            <option value="1">Electrodomesticos</option>
                            <option value="2">Vestimenta</option>
                            <option value="3">Tecnologia</option>
                            <option value="4">Deportes</option>
                            <option value="5">Abarrotes</option>
                            <option value="6">Otros</option>
                        </Form.Select>

                        <Form.Group controlId="photo">
                            <Form.Label>Subir foto</Form.Label>
                            <UploadWidget
                                onUpload={(url) => {
                                    actions.handleProductOnChange({ target: { name: 'photo', value: url } });
                                    setFormData((prevFormData) => ({
                                        ...prevFormData,
                                        photo: url,
                                    }));
                                    setErrorMessage('');
                                }}
                                actions={actions}
                            />
                            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                            <Form.Control.Feedback type="invalid">
                                Please upload at least one photo of your product.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mt-2 mb-2" controlId="product_info">
                            <Form.Label>Información del producto</Form.Label>
                            <Form.Control
                                type="text"
                                name="product_info"
                                value={formData.product_info}
                                onChange={chngProduct}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Por favor ingrese la información de su producto.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mt-2 mb-2" controlId="brand">
                            <Form.Label>Marca</Form.Label>
                            <Form.Control
                                type="text"
                                name="brand"
                                value={formData.brand}
                                onChange={chngProduct}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Por favor ingrese la marca de su producto
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Button className='mt-4 mb-5 btn btn-primary' style={{ backgroundColor: '#426B1F' }} type="submit">Publicar producto</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default ProductUploadForm;
