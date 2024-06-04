import React, { useContext, useEffect } from 'react';
import { Context } from '../store/context';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Notifications = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getoffertrade();
        console.log(store.tradeinfo);
    }, []);

    const handleAccept = (tradeId) => {
        console.log(`Se ha aceptado el intercambio con ID: ${tradeId}`);
    };

    const handleReject = (tradeId) => {
        console.log(`Se ha rechazado el intercambio con ID: ${tradeId}`);
    };

    const renderNotifications = () => {
        return store.tradeinfo.map((trade, index) => (
            <Card key={index} style={{ margin: '10px 0' }}>
                <Card.Body>
                    <Container>
                        <Row>
                            <Col>
                                <h5>Producto Ofrecido</h5>
                                <Link to={`/product/${trade.product_offered.id}`}>{trade.product_offered.name}</Link>
                                <p>Marca: {trade.product_offered.brand}</p>
                                <p>Descripción: {trade.product_offered.product_info}</p>
                                <img src={trade.product_offered.photo} alt={trade.product_offered.name} style={{ maxWidth: '100%' }} />
                                <p>Precio: {trade.product_offered.price}</p>
                            </Col>
                            <Col>
                                <h5>Producto Ofertado</h5>
                                <Link to={`/product/${trade.product.id}`}>{trade.product.name}</Link>
                                <p>Marca: {trade.product.brand}</p>
                                <p>Descripción: {trade.product.product_info}</p>
                                <img src={trade.product.photo} alt={trade.product.name} style={{ maxWidth: '100%' }} />
                                <p>Precio: {trade.product.price}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h5>Info del usuario que recibió la oferta</h5>
                                <p>Email: {trade.user.email}</p>
                                <p>Nombre: {trade.user.firstname}</p>
                                <p>Usuario: {trade.user.username}</p>
                            </Col>
                            <Col>
                                <h5>Info del usuario interesado</h5>
                                <p>Email: {trade.user_interested.email}</p>
                                <p>Nombre: {trade.user_interested.firstname}</p>
                                <p>Usuario: {trade.user_interested.username}</p>
                            </Col>
                        </Row>
                    </Container>

                
                </Card.Body>
            </Card>
        ));
    };

    return (
        <div>
            {store.tradeinfo.length > 0 ? renderNotifications() : <div>No hay notificaciones disponibles.</div>}
        </div>
    );
};

export default Notifications;
