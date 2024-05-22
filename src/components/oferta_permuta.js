import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { Context } from "../store/context"
import { useContext } from "react"

function OfertaPermuta() {
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [categoria, setCategoria] = useState('');
    const { actions, store } = useContext(Context)



    const handleSubmit = (e) => {
        e.preventDefault();
        const nuevaOferta = {
            titulo,
            descripcion,
            categoria,
        };
    };

    return (
        <Form onSubmit={handleSubmit}>
            <ul>{store.UserProductOfferList.map((product,index) =>
                <li className='ListaContactos  border d-inline-flex p-2 mt-4 mx-2' key={index}>
                    <Button href="/productreview">
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" />
                            <Card.Body>
                                <Card.Title style={{ fontWeight: "bold", fontSize: "25px" }}>{store.UserProductOfferList[index].name}</Card.Title>
                                <Card.Text >
                                    Descripcion: {store.UserProductOfferList[index].product_info}
                                </Card.Text>
                                <Card.Text>
                                    Precio: {store.UserProductOfferList[index].price}
                                </Card.Text>

                            </Card.Body>
                        </Card>
                    </Button>
                    


                </li>)}

            </ul>
            <Form.Select className="mt-4 mb-3" aria-label="Default select example">
                <option>Categoria del producto</option>
                <option value="1">Electrodomesticos</option>
                <option value="2">Vestimenta</option>
                <option value="3">Tecnologia</option>
                <option value="4">Deportes</option>
                <option value="6">Otros</option>
            </Form.Select>
            <Form.Group controlId="titulo">
                <Form.Label>Título</Form.Label>
                <Form.Control
                    type="text"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group controlId="descripcion">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group controlId="categoria">
                <Form.Label>Categoría</Form.Label>
                <Form.Control
                    type="text"
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    required
                />
            </Form.Group>

            <Card> <div>{store.UserProductForPermuta.photo} </div>cambialo por esto</Card>

            <Button variant="primary" type="submit">
                Crear Oferta
            </Button>
        </Form>
        
    );
}

export default OfertaPermuta;
