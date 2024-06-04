import React, { useContext, useEffect } from 'react';
import { Context } from '../store/context';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import { Container, Row, Col, CardTitle, CardText, CardImg } from 'react-bootstrap';
import './notifications.css';
import DeleteModal from './modal';

const Notifications = () => {
    const { store, actions } = useContext(Context);


    useEffect(() => {
        actions.getoffertrade()
  
        console.log(store.tradeinfo)
    }, [])

    const handleAccept = (tradeId) => {
        console.log(`Se ha aceptado el intercambio con ID: ${tradeId}`);
    };

    function numberWithDots(x) {
        var parts = x.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        return parts.join(",");
    }


    return (
        <Container className='mt-4 d-block'>
            <h4 className='d-flex justify-content-center me-5'>Ofertas Permuta</h4>
            {store.tradeinfo.map((product, index) => (
                <ul className='oferta d-flex col-12 mt-5' key={index}>
                    <Col sm="5" >
                        <Card style={{ backgroundColor: '#dfffd8', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }} body >
                            <CardText className='mt-2 ' tag="h5">
                                <p className='info'>Producto:</p>   {store.tradeinfo[index].product_offered.name}
                            </CardText>
                            <CardText>
                                <p className='info'> Informacion Producto: </p>   {store.tradeinfo[index].product_offered.product_info}
                            </CardText>
                            <CardText>
                                <p className='info'>Monto Ofrecido: </p>  ${numberWithDots(store.tradeinfo[index].product_offered.amount)}
                            </CardText>

                            <Card.Img className="cardimg" variant="top" src={store.tradeinfo[index].product_offered.photo} />

                        </Card>
                    </Col>
                    <i className="flecha fa fa-arrow-right align-content-center mx-4"></i>
                    <Col sm="5" >
                        <Card body style={{ backgroundColor: '#3cb371', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                            <CardText className='mt-2' tag="h5" >
                                <p className='info'>Producto:</p> {store.tradeinfo[index].product.name}
                            </CardText>
                            <CardText>
                                <p className='info'> Informacion Producto:</p> {store.tradeinfo[index].product.product_info}
                            </CardText>
                            <CardText>
                                <p className='info'>Precio:</p> ${numberWithDots(store.tradeinfo[index].product.price)}
                            </CardText>

                            <Card.Img className="cardimg" variant="top" src={store.tradeinfo[index].product.photo} />
                        </Card>
                    </Col>
                    <div className='align-content-center ms-3 mt-4 p-1'>
                        <div className='d-flex'>
                            <Link to='/permutacompletada'className='pt-1 aceptar mx-1 bg-success rounded' onClick={() => actions.permutacompletaindex(index)}>
                                <i className="fa fa-check accept text-white"></i>
                            </Link>
                            <Button className='btn-danger eliminar p-0 pt-1'><DeleteModal index={index}></DeleteModal></Button>

                        </div>

                    </div>


                </ul>





            ))}  </Container>


    );





};

export default Notifications;
