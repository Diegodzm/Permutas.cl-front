import { Context } from "../store/context";
import { useContext, useEffect } from "react";
import './allproducts.css';
import { Link } from "react-router-dom";
import { Button, Card, Row, Col } from 'react-bootstrap';

const Allproducts = () => {
    const { actions, store } = useContext(Context);

    useEffect(() => {
        actions.accessTokenExpired();
        actions.fetchPublishedProducts();
        actions.getProductsbyUser();
    }, []);
    
    function numberWithDots(x) {
        var parts = x.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        return parts.join(",");
    }
    const allproducts = store.publishedProducts;
    const userproducts = store.userProducts;
    let productdif = allproducts.filter(a => !userproducts.map(b => b.user_id).includes(a.user_id));

    const handleCardClick = (product) => {
        actions.setSelectedProduct(product); 
        console.log(store.productIndex);
        const indexProduct = store.publishedProducts.indexOf(product);
        actions.showIndex(indexProduct);
    };

    const isInWishlist = (product) => {
        const { userwishlist } = store;
        return userwishlist.some(item => item.name === product.name && item.product_info === product.product_info && item.photo === product.photo);
    };

    return (
        <div className="allproducts-container">
            <div className="background" />
            <Row className="mt-5">
                {productdif.map((product, index) => (
                    <Col className='product_card mb-4' xs={12} sm={6} md={4} lg={3} key={index}>
                        <Card style={{ width: '100%', backgroundColor: '#ffffff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}>
                            <Card.Img className="cardimg d-flex mx-auto" variant="top" src={product.photo} />
                            <Card.Body>
                                <Card.Title style={{ fontWeight: "bold", fontSize: "18px", color: '#333' }}>{product.name}</Card.Title>
                                <Card.Text style={{ color: '#666' }}>
                                    Descripción: {product.product_info}
                                </Card.Text>
                                <Card.Text style={{ color: '#666' }}>
                                    Precio: $    {numberWithDots(product.price)}
                                </Card.Text>
                                <Link to='/oferta_permuta'>
                                    <Button className="bg-success mt-1 mb-2" onClick={() => handleCardClick(product)} style={{ backgroundColor: '#006400', borderColor: '#006400', color: '#fff', width: '100%' }}>
                                        Ofertar
                                    </Button>
                                </Link>
                                <Button
                                    className="bg-success mt-1 mb-2"
                                    onClick={() => actions.addWishedproduct(product)}
                                    disabled={isInWishlist(product)} 
                                    style={{ backgroundColor: '#006400', borderColor: '#2e8b57', color: '#fff', width: '100%' }}
                                >
                                    Agregar a favoritos
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default Allproducts;
