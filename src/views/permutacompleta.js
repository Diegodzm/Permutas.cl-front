import React, { useContext, useEffect } from 'react';
import { Context } from '../store/context';
import { Container, Col, CardTitle, CardText, Card } from 'react-bootstrap';


const PermutaCompleta = () => {
    const { store, actions } = useContext(Context);
    function numberWithDots(x) {
        var parts = x.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        return parts.join(",");
    }



    
    return <div>
        <h1 className='titulo d-flex justify-content-center mt-5'>Permuta Aceptada!</h1>
        <Container className='d-flex mt-5 mb-5'>
    <Col sm="5" className='mx-4'>
        <CardTitle className='ms-3 mb-2'>Datos Permutador</CardTitle>
        <Card style={{ backgroundColor: '#00d7ce', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',height:'400px'}} body >
            <CardText className='mt-2 ' tag="h5">
                <p className='info'>Email: </p>   {store.tradeinfo[store.userindexpermutacompleta].user_interested.email}
            </CardText>
            <CardText>
                <p className='info'> Nombre: </p>   {store.tradeinfo[store.userindexpermutacompleta].user_interested.firstname}

            </CardText>
            <CardText>
                <p className='info'>Apellido:</p> {store.tradeinfo[store.userindexpermutacompleta].user_interested.lastname}
            </CardText>
            <CardText>
                <p className='info'>Username:</p> {store.tradeinfo[store.userindexpermutacompleta].user_interested.username}
            </CardText>
           

        </Card>
    </Col>

    <Col sm="6" >
        <CardTitle className='mb-2 ms-3'>Datos Producto</CardTitle>
        <Card style={{ backgroundColor: '#26fba9', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }} body >
            <CardText className='mt-2 ' tag="h5">
                <p className='info'>Producto:</p>   {store.tradeinfo[store.userindexpermutacompleta].product_offered.name}
            </CardText>
            <CardText>
                <p className='info'> Informacion Producto: </p>   {store.tradeinfo[store.userindexpermutacompleta].product_offered.product_info}
            </CardText>
            <CardText>
                <p className='info'>Monto Ofrecido: </p>  ${numberWithDots(store.tradeinfo[store.userindexpermutacompleta].product_offered.amount)}
            </CardText>

            <Card.Img className="cardimg" variant="top" src={store.tradeinfo[store.userindexpermutacompleta].product_offered.photo} />

        </Card>
    </Col>


</Container>
</div>

}

export default PermutaCompleta