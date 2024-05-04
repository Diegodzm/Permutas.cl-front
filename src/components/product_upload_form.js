import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { Context } from "../store/context";
import { useContext } from "react"
import { Link } from "react-router-dom"

const ProductUploadForm = () => {
    const {store, actions}= useContext(Context)
    const [validated, set_Validated] = useState(false);
    const [formData, setFormData] = useState ({

        name:"",
        price:0,
        photo:"",
        product_info:"",
        brand:"",
        category_id:"",
    });

    const submitProduct = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        set_Validated(true);

        if(set_Validated){
            store.productForm= formData
        }   
    }
    const chngProduct = (event) => {
        
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        actions.handleProductOnChange(event)
        console.log(store.productForm)
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
                        <Form.Group className="mt-2 mb-2" controlId="category_id">
                            <Form.Label>Category</Form.Label> 
                            <Form.Control
                                type="text"
                                name="category_id"
                                value={formData.category_id}
                                onChange={chngProduct}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Please enter a category for your product
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Button className='mt-4 mb-5'type="submit" onClick={submitProduct}>Submit Product</Button>
                        <Link to='/'></Link>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
    
};

export default ProductUploadForm;