import { Context } from "../store/context"
import { useContext, useEffect } from "react"
import { useNavigate, } from "react-router-dom";
import './allproducts.css'
import { Link } from "react-router-dom";
import { Button, Card, Row, Col, Container } from 'react-bootstrap';

const Allproducts = () => {
    const { actions, store } = useContext(Context)

    useEffect(() => {
        actions.accessTokenExpired()
        actions.fetchPublishedProducts()
        console.log(store.publishedProducts)
    }, []);

    const handleCardClick = (product) => {
        actions.setSelectedProduct(product) 
        console.log(store.productIndex)
        const indexProduct=store.publishedProducts.indexOf(product)
        actions.showIndex(indexProduct)
        
    };

    return <div className="container mt-5">
    <Row>
        {store.publishedProducts.map((product, index) => (
            <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
                <Button onClick={() => handleCardClick(product)} className="p-0" style={{ border: 'none', width: '100%' }}>
                    <Link to='/oferta_permuta' style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Card style={{ width: '100%', backgroundColor: '#ffffff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}>
                            <Card.Img className="cardimg" variant="top" src={product.photo} />
                            <Card.Body>
                                <Card.Title style={{ fontWeight: "bold", fontSize: "18px", color: '#333' }}>{product.name}</Card.Title>
                                <Card.Text style={{ color: '#666' }}>
                                    Descripción: {product.product_info}
                                </Card.Text>
                                <Card.Text style={{ color: '#666' }}>
                                    Precio: {product.price}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Link>
                </Button>
            </Col>
        ))}
    </Row>
</div>}

    export default Allproducts