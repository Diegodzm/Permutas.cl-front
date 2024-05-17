import React, { useState, useEffect } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { Context } from "../store/context";
import { useContext } from "react";

function OfertaPermuta() {
    const { store, actions } = useContext(Context);
    const [selectedProductIndex, setSelectedProductIndex] = useState(null);
    const [addedMoney, setAddedMoney] = useState(""); 
    useEffect(() => {
        actions.getProductsbyUser()
        console.log(store.getProductsbyUser)
    }, []);
    
    const handleProductClick = (index) => {
        setSelectedProductIndex(index);
    };

    const handleExchange = () => {
        if (selectedProductIndex !== null) {
            const selectedProduct = store.UserProductOfferList[selectedProductIndex];
            const userProductForPermuta = store.UserProductForPermuta[0];
            
            const money = parseFloat(addedMoney.replace(/[^0-9.,]/g, '').replace(',', '.')) || 0;

            actions.exchangeProducts(selectedProduct, userProductForPermuta, money); 

            setSelectedProductIndex(null);
            setAddedMoney("");
        } else {
            console.log("Por favor selecciona un producto para intercambiar.");
        }
    };

    const handleMoneyChange = (event) => {
        setAddedMoney(event.target.value.replace(/[^0-9.]/g, ''));
    };

    return (
        <>
            <ul>
                {store.UserProductOfferList.map((product, index) => (
                    <li className='ListaContactos border d-inline-flex p-2 mt-4 mx-2' key={index}>
                        <Button onClick={() => handleProductClick(index)}>
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={product.photo} />
                                <Card.Body>
                                    <Card.Title style={{ fontWeight: "bold", fontSize: "25px" }}>{product.name}</Card.Title>
                                    <Card.Text>
                                        Descripción: {product.product_info}
                                    </Card.Text>
                                    <Card.Text>
                                        Precio: {product.price.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Button>
                        
                    </li>
                ))}
            </ul>
            <div>
                {selectedProductIndex !== null && (
                    <Card style={{ width: '18rem', margin: '20px auto' }}>
                        <Card.Img variant="top" src={store.UserProductForPermuta[0].photo} />
                        <Card.Body>
                            <Card.Title style={{ fontWeight: "bold", fontSize: "25px" }}>{store.UserProductForPermuta[0].name}</Card.Title>
                            <Card.Text>
                                Descripción: {store.UserProductForPermuta[0].product_info}
                            </Card.Text>
                            <Card.Text>
                                Precio: {store.UserProductForPermuta[0].price.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}
                            </Card.Text>
                            <Form.Group>
                                <Form.Label>Agregar dinero:</Form.Label>
                                <Form.Control type="text" value={addedMoney} onChange={handleMoneyChange} />
                            </Form.Group>
                        </Card.Body>
                    </Card>
                )}
            </div>

            
            <Button variant="primary" onClick={handleExchange}>
                Intercambiar Producto Seleccionado
            </Button>
        </>
    );
}

export default OfertaPermuta;
