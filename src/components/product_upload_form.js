import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { Context } from "../store/context";
import { useContext } from "react";
import { Link } from "react-router-dom";
import UploadWidget from "./UploadWidget";

const ProductUploadForm = () => {
    const { store, actions } = useContext(Context)
    const [validated, set_Validated] = useState(false);
    const [formData, setFormData] = useState({

        name: "",
        price: 0,
        product_info: "",
        brand: "",
        user_id: 1
    });

    const submitProduct = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        set_Validated(true);

       /*  if (set_Validated) {
            actions.handleProductUpload(event)  
        } */
    }
    useEffect(() => {
        console.log("Datos del formulario actualizados:", formData);
    }, [formData]);

    const chngProduct = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));

        actions.handleProductOnChange(event);
    };



    return (
        <Container className="mt-5">
            <Row>
                <Col
                    md={{
                        span: 6,
                        offset: 3,
                    }}>
                    <Form noValidate validated={validated} onSubmit={actions.handleProductUpload}>
                        <Form.Group className="mt-2 mb-2" controlId="name" autoComplete="off">
                            <Form.Label>Product name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={chngProduct}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Please enter a product name.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mt-2 mb-2" controlId="price">
                            <Form.Label>Price CL$</Form.Label>
                            <Form.Control
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={chngProduct}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Please enter a price.
                            </Form.Control.Feedback>
                        </Form.Group>

                        {/*ID DE PRUEBA*/}

                        <Form.Group className="mt-2 mb-2" controlId="user_id">
                            <Form.Label>Test user id</Form.Label>
                            <Form.Control
                                type="number"
                                name="user_id"
                                value={formData.user_id}
                                onChange={chngProduct}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Please enter a user id.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="photo">
                            <Form.Label>Subir foto</Form.Label>
                            <UploadWidget onUpload={(url) => actions.handleProductOnChange({ target: { name: 'photo', value: url } })} actions={actions} />
                            <Form.Control.Feedback type="invalid">
                                Please upload at least one photo of your product.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mt-2 mb-2" controlId="product_info">
                            <Form.Label>Product info</Form.Label>
                            <Form.Control
                                type="text"
                                name="product_info"
                                value={formData.product_info}
                                onChange={chngProduct}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Please enter the info of your product.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mt-2 mb-2" controlId="brand">
                            <Form.Label>Brand</Form.Label>
                            <Form.Control
                                type="text"
                                name="brand"
                                value={formData.brand}
                                onChange={chngProduct}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Please enter the product's brand.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Button className='mt-4 mb-5' type="submit" onClick={submitProduct}>Submit Product</Button>
                        <Link to='/'></Link>
                    </Form>
                </Col>
            </Row>
        </Container>
    );

};

export default ProductUploadForm;