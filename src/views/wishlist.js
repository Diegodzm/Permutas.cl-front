import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
import { Context } from "../store/context";
import { Link } from "react-router-dom";

const Wishlist = () => {
    const { store, actions } = useContext(Context);
    const [expandedCardIndex, setExpandedCardIndex] = useState([]);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [productIdToDelete, setProductIdToDelete] = useState(null);

    useEffect(() => {
        actions.getWishlist();
        actions.accessTokenExpired();
    }, []);

    const toggleExpand = (index) => {
        setExpandedCardIndex(prevState => {
            if (prevState.includes(index)) {
                return prevState.filter(item => item !== index);
            } else {
                return [...prevState, index];
            }
        });
    };

    const isExpanded = (index) => {
        return expandedCardIndex.includes(index);
    };

    const handleDeleteButtonClick = (productId) => {
        setProductIdToDelete(productId);
        setShowConfirmationModal(true);
    };

    const handleCardClick = (product) => {
        actions.setSelectedProduct(product);

        const indexProduct = store.userwishlist.findIndex(item => item.id === product.id);
        console.log("Índice del producto en la lista de deseos:", indexProduct);

        if (indexProduct !== -1) {
            actions.showIndex(indexProduct);
        
        }
    };
    

    const handleConfirmDelete = () => {
        if (productIdToDelete) {
            console.log("Producto a eliminar:", productIdToDelete);
            actions.removeWishedProduct(productIdToDelete);
        }
        setShowConfirmationModal(false);
    };

    const handleCloseModal = () => {
        setShowConfirmationModal(false);
        setProductIdToDelete(null);
    };

    return (
        <Container>
            <h1 className="my-4">Mis Favoritos</h1>
            <Row xs={1} md={2} lg={3} className="g-4">
                {store.userwishlist.map((product, index) => (
                    <Col key={index}>
                        <Card style={{ width: '100%', backgroundColor: '#ffffff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}>
                            <Card.Img className="cardimg" variant="top" src={product.photo} />
                            <Card.Body>
                                <Card.Title style={{ fontWeight: 'bold', fontSize: '18px', color: '#333' }}>{product.name}</Card.Title>
                                {isExpanded(index) && (
                                    <>
                                        <Card.Text style={{ color: '#666' }}>Descripción: {product.product_info}</Card.Text>
                                        <Card.Text style={{ color: '#666' }}>Precio: {product.price}</Card.Text>
                                        <Button variant="secondary" onClick={() => toggleExpand(index)}>
                                            Ver menos
                                        </Button>
                                        <Link to='/oferta_permuta_wish'>
                                            <Button className="bg-success mt-1 mb-2" onClick={() => handleCardClick(product)} style={{ backgroundColor: '#006400', borderColor: '#006400', color: '#fff', width: '100%' }}>
                                                Ofertar
                                            </Button>
                                        </Link>
                                        <Button variant="danger" onClick={() => handleDeleteButtonClick(product.id)}>
                                            Eliminar de Favoritos
                                        </Button>
                                    </>
                                )}
                                {!isExpanded(index) && (
                                    <Button variant="success" onClick={() => toggleExpand(index)}>
                                        Ver más
                                    </Button>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>


            <Modal show={showConfirmationModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Eliminación</Modal.Title>
                </Modal.Header>
                <Modal.Body>¿Estás seguro de que deseas eliminar este producto de tus favoritos?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={handleConfirmDelete}>
                        Eliminar
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default Wishlist;
