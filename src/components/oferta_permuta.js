import React, { useEffect, useState, useContext } from 'react';
import { Button, Card, Row, Col, Container } from 'react-bootstrap';
import { Context } from "../store/context";

function OfertaPermuta() {
    const [productosOferta, setProductosOferta] = useState([]);
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);

    const { actions, store } = useContext(Context);

    useEffect(() => {
        actions.getProductsbyUser();
        console.log(store.selectedProduct)
        console.log("producto seleccionado")
    }, []);

    const handleOfferButtonClick = (index) => {
        const selectedProduct = store.userProducts[index];
        setProductosOferta([...productosOferta, selectedProduct]);
    };

    const handleSelectButtonClick = (product) => {
        setProductoSeleccionado(product);
    };

    const handleRemoveOffer = (index) => {
        setProductosOferta(productosOferta.filter((_, i) => i !== index));
    };

    const handleRemoveSelection = () => {
        setProductoSeleccionado(null);
    };

    const handleUndoButtonClick = () => {
        setProductosOferta([]);
        setProductoSeleccionado(null);
    };

    const handleOfferTradeButtonClick = async () => {
        if (!productoSeleccionado || productosOferta.length === 0) {
            alert("Debes seleccionar al menos un producto para ofrecer.");
            return;
        }
    
        const offerId = productosOferta.id; 
        const selectedProductId = productoSeleccionado.id;
        console.log(offerId)
        console.log(selectedProductId)
        try {
            const response = await fetch(`/exchange/${offerId}/${selectedProductId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${store.accessToken}`,
                },
            });
    
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message);
            }
    
            alert("La transacción se ha realizado exitosamente.");
    
            setProductosOferta([]);
            setProductoSeleccionado(null);
    
        } catch (error) {
            alert(error.message);
        }
    };
    

    return (
        <Container>
            {/* Sección de productos para ofrecer */}
            <div className="section" style={{ backgroundColor: '#e6f7e6', padding: '20px', borderRadius: '10px' }}>
                <h2 className="text-center" style={{ color: '#556b2f' }}>Productos para ofrecer</h2>
                <Row>
    {store.userProducts.map((product, index) => (
        <Col key={index} xs={12} sm={6} md={4} lg={3} className='mb-4'>
            {!productosOferta.find(p => p.id === product.id) && (
                <Card style={{ width: '12rem', backgroundColor: '#d4edda' }}>
                    <Card.Img className="cardimg" variant="top" src={product.photo} />
                    <Card.Body>
                        <Card.Title style={{ fontWeight: "bold", fontSize: "18px" }}>{product.name}</Card.Title>
                        <Card.Text>
                            Descripción: {product.product_info}
                        </Card.Text>
                        <Card.Text>
                            Precio: {product.price}
                        </Card.Text>
                        <Button style={{ backgroundColor: '#7BD389' }} onClick={() => handleOfferButtonClick(index)}>Ofrecer</Button>
                    </Card.Body>
                </Card>
            )}
        </Col>
    ))}
</Row>
            </div>

            {/* Sección central para los productos seleccionados */}
            <div className="section mt-4" style={{ backgroundColor: '#f0fff0', padding: '20px', borderRadius: '10px' }}>
                {(productosOferta.length > 0 || productoSeleccionado) && <h2 className="text-center" style={{ color: '#556b2f' }}>Productos seleccionados</h2>}
                <Row>
                    {productosOferta.map((product, index) => (
                        <Col key={index} xs={12} sm={6} md={4} lg={3} className='mb-4'>
                            <Card style={{ width: '12rem', backgroundColor: '#fff3cd' }}>
                                <Card.Body>
                                    <Card.Title>{product.name}</Card.Title>
                                    <Card.Img className="cardimg" variant="top" src={product.photo} />
                                    <Card.Text>Descripción: {product.product_info}</Card.Text>
                                    <Card.Text>Precio: {product.price}</Card.Text>
                                    <Button variant="danger" onClick={() => handleRemoveOffer(index)}>Cancelar Oferta</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                    {productoSeleccionado && (
                        <Col xs={12} sm={6} md={4} lg={3} className='mb-4'>
                            <Card style={{ width: '12rem', backgroundColor: '#d1ecf1' }}>
                                <Card.Img className="cardimg" variant="top" src={productoSeleccionado.photo} />
                                <Card.Body>
                                    <Card.Title>{productoSeleccionado.name}</Card.Title>
                                    <Card.Text>Descripción: {productoSeleccionado.product_info}</Card.Text>
                                    <Card.Text>Precio: {productoSeleccionado.price}</Card.Text>
                                    <Button variant="danger" onClick={handleRemoveSelection}>Cancelar Selección</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    )}
                </Row>
                {productosOferta.length > 0 && productoSeleccionado && (
                    <div className="d-flex justify-content-between mt-4">
                        <Button onClick={handleOfferTradeButtonClick} style={{ backgroundColor: '#049a8f' }}>Ofrecer Intercambio</Button>
                        <Button variant="warning" onClick={handleUndoButtonClick}>Deshacer Operación</Button>
                    </div>
                )}
            </div>

            {/* Sección de productos para seleccionar */}
            <div className="section mt-4" style={{ backgroundColor: '#e6f7e6', padding: '20px', borderRadius: '10px' }}>
                <h2 className="text-center" style={{ color: '#556b2f' }}>Productos para seleccionar</h2>
                <Row>
    {store.publishedProducts.map((product, index) => (
        <Col key={index} xs={12} sm={6} md={4} lg={3} className='mb-4'>
            {( 
                <Card style={{ width: '12rem', backgroundColor: '#e2e3e5' }}>
                    <Card.Img className="cardimg" variant="top" src={product.photo} />
                    <Card.Body>
                        <Card.Title style={{ fontWeight: "bold", fontSize: "18px" }}>{product.name}</Card.Title>
                        <Card.Text>
                            Descripción: {product.product_info}
                        </Card.Text>
                        <Card.Text>
                            Precio: {product.price}
                        </Card.Text>
                        <Button style={{ backgroundColor: '#036D4E' }} onClick={() => handleSelectButtonClick(product)}>Seleccionar</Button>
                    </Card.Body>
                </Card>
            )}
        </Col>
    ))}
</Row>
            </div>
        </Container>
    );
}

export default OfertaPermuta;
