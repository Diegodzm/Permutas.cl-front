import React, { useState,useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { Context } from "../store/context";
import { useContext } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";

const ProductUploadForm = () => {
    const navigate = useNavigate()
    const { store, actions } = useContext(Context)
    const [validated, set_Validated] = useState(false);
    const [formData, setFormData] = useState({

        name: "",
        price: 0,
        photo: "",
        product_info: "",
        brand: "",
        category_id:0,
    });
    useEffect(() => {
        actions.accessTokenExpired()

    }, []);
    const categoryOnchange=(e)=>{
        const index = e.target.selectedIndex;
        actions.setCategory(index)
        return index


    }
    

    const submitProduct = (event) => {
        const form = event.currentTarget;
        event.preventDefault()
        if (form.checkValidity() === false) {

            event.stopPropagation();
        }
        set_Validated(true);

        if (set_Validated) {
            actions.ProductUpload()
            .then(response=>{if(response){navigate('/')}})
        }
    }
    const chngProduct = (event) => {

        const { name, value } = event.target;
        
        
        setFormData({
            ...formData,
            [name]: value,
        
        });
        actions.handleProductOnChange(event)
      
    };
   



    return (
        <Container className="mt-5">
            <Row>
                <Col
                    md={{
                        span: 6,
                        offset: 3,
                    }}>
                    <Form noValidate validated={validated} onSubmit={submitProduct}>
                        <Form.Group className="mt-2 mb-2" controlId="name">
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
                                Please enter a price
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Select onChange={e=>categoryOnchange(e)} className="mt-4 mb-3" aria-label="Default select example">
                            <option>Categoria del producto</option>
                            <option value="1">Electrodomesticos</option>
                            <option value="2">Vestimenta</option>
                            <option value="3">Tecnologia</option>
                            <option value="4">Deportes</option>
                            <option value="5">Abarrotes</option>
                            <option value="6">Otros</option>
                        </Form.Select>
                        <Form.Group className="mt-2 mb-2" controlId="photo">
                            <Form.Label>Photo url</Form.Label>
                            <Form.Control
                                type="url"
                                name="photo"
                                value={formData.photo}
                                onChange={chngProduct}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Please enter a valid photo url of your product
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
                                Please enter the info of your product
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
                                Please enter the product's brand
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Button className='mt-4 mb-5' type="submit">Submit Product</Button>
                        <Link to='/'></Link>
                    </Form>
                </Col>
            </Row>
        </Container>
    );

};

export default ProductUploadForm;