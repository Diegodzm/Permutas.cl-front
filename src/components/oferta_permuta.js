import React, { useEffect, useState, useContext } from 'react';
import { Button, Card, Row, Col, Container } from 'react-bootstrap';
import { Context } from "../store/context";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Navigate, useNavigate } from 'react-router-dom';


function OfertaPermuta() {
    const navigate= useNavigate()
    const [productosOferta, setProductosOferta] = useState([]);
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);
    const [amount, setAmount] = useState('');

    const { actions, store } = useContext(Context);

    useEffect(() => {
        actions.getProductsbyUser();
        console.log(store.selectedProduct)
        console.log("producto seleccionado")
    }, []);

    const handleChange = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value) && value <= store.publishedProducts[store.productIndex].price) {
            setAmount(value);
            console.log("amount:", value)

        }
    };

    const handleOfferButtonClick = (index) => {
        const selectedProduct = store.userProducts[index];
        setProductosOferta([...productosOferta, selectedProduct]);
        console.log(selectedProduct)
        actions.setSelectedOfferProduct(selectedProduct)
        console.log("avanza el producto:", index)

    };

    const handleSelectButtonClick = () => {
        console.log("boton select apretado");
        setProductoSeleccionado(store.publishedProducts[store.productIndex]);
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



    return (
        <Container>
            {/* Sección de productos para ofrecer */}
            <div className="section" style={{ backgroundColor: '#85d485', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <h2 className="text-center" style={{ color: '#006400' }}>Productos para ofrecer</h2>
                <Row>
                    {store.userProducts.map((product, index) => (
                        <Col key={index} xs={12} sm={6} md={4} lg={3} className='mb-4'>
                            {!productosOferta.find(p => p.id === product.id) && (
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
                                        <Button style={{ backgroundColor: '#006400', borderColor: '#006400', color: '#fff' }} onClick={() => handleOfferButtonClick(index)}>Ofrecer</Button>
                                    </Card.Body>
                                </Card>
                            )}
                        </Col>
                    ))}
                </Row>
            </div>

            {/* Sección central para los productos ofertados y seleccionados */}
            <div className="section mt-4" style={{ backgroundColor: '#f0fcfb', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                {(productosOferta.length > 0 || productoSeleccionado) && <h2 className="text-center" style={{ color: '#006400' }}>Productos para permutar</h2>}
                <Row className="justify-content-between align-items-center">
                    <Col xs={6} className="d-flex justify-content-end">
                        {productosOferta.map((product, index) => (
                            <Card key={index} style={{ width: '100%', backgroundColor: '#dfffd8', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '10px', marginRight: index === productosOferta.length - 1 ? 0 : '20px' }}>
                                <Card.Body>
                                    <Card.Title style={{ fontWeight: "bold", fontSize: "18px", color: '#006400' }}>Producto ofrecido: {product.name}</Card.Title>
                                    <div className="card-img-container" style={{ maxHeight: '200px', overflow: 'hidden' }}>
                                        <Card.Img className="cardimg" variant="top" src={product.photo} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                                    </div>
                                    <Card.Text style={{ color: '#4f4f4f' }}>Descripción: {product.product_info}</Card.Text>
                                    <Card.Text style={{ color: '#4f4f4f' }}>Precio: {product.price}</Card.Text>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text>Monto extra $</InputGroup.Text>
                                        <Form.Control
                                            aria-label="Monto"
                                            type="number"
                                            value={amount}
                                            onChange={handleChange}
                                            placeholder="Ingresa un monto (opcional)"
                                        />
                                    </InputGroup>

                                    <Button variant="danger" style={{ color: '#fff', backgroundColor: '#dc3545', borderColor: '#dc3545' }} onClick={() => handleRemoveOffer(index)}>Cancelar Oferta</Button>
                                </Card.Body>
                            </Card>
                        ))}
                    </Col>
                    <Col xs={6} className="d-flex justify-content-start">
                        {productoSeleccionado && (
                            <Card style={{ width: '100%', backgroundColor: '#d1f7d1', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}>
                                <Card.Img className="cardimg" variant="top" src={productoSeleccionado.photo} />
                                <Card.Body>
                                    <Card.Title style={{ fontWeight: "bold", fontSize: "18px", color: '#006400' }}>Para permutar: {productoSeleccionado.name}</Card.Title>
                                    <Card.Text style={{ color: '#4f4f4f' }}>Descripción: {productoSeleccionado.product_info}</Card.Text>
                                    <Card.Text style={{ color: '#4f4f4f' }}>Precio: {productoSeleccionado.price}</Card.Text>
                                    <Button variant="danger" style={{ color: '#fff', backgroundColor: '#dc3545', borderColor: '#dc3545' }} onClick={handleRemoveSelection}>Cancelar Selección</Button>
                                </Card.Body>
                            </Card>
                        )}
                    </Col>
                </Row>
                {productosOferta.length > 0 && productoSeleccionado && (
                    <div className="text-center mt-4">
                        <Button onClick={(index) => {
                            console.log("Índice en onClick:", store.productIndex);
                            console.log("Amount en onClick:", amount);
                            actions.handleOfferTradeButtonClick( amount)
                            .then(response=>{if(response){navigate('/')}})
                        }} style={{ backgroundColor: '#20c997', borderColor: '#20c997', color: '#fff', marginRight: '10px' }}>Ofrecer Intercambio</Button>

                        <Button variant="warning" style={{ color: '#fff', backgroundColor: '#ffc107', borderColor: '#ffc107' }} onClick={handleUndoButtonClick}>Deshacer Operación</Button>
                    </div>
                )}
            </div>


            {/* Sección de productos para seleccionar */}
            <div className="section mt-4" style={{ backgroundColor: '#65a165', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <h2 className="text-center" style={{ color: '#f0fcfb' }}>Productos para seleccionar</h2>
                <Row>
                    {productoSeleccionado ? null : (
                        store.publishedProducts && store.publishedProducts[store.productIndex] && (
                            <Col xs={12} sm={6} md={4} lg={3} className='mb-4'>
                                <Card style={{ width: '100%', backgroundColor: '#ffffff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}>
                                    <Card.Img className="cardimg" variant="top" src={store.publishedProducts[store.productIndex].photo} />
                                    <Card.Body>
                                        <Card.Title style={{ fontWeight: "bold", fontSize: "18px", color: '#333' }}>{store.publishedProducts[store.productIndex].name}</Card.Title>
                                        <Card.Text style={{ color: '#666' }}>
                                            Descripción: {store.publishedProducts[store.productIndex].product_info}
                                        </Card.Text>
                                        <Card.Text style={{ color: '#666' }}>
                                            Precio: {store.publishedProducts[store.productIndex].price}
                                        </Card.Text>
                                        <Button style={{ backgroundColor: '#006400', borderColor: '#006400', color: '#fff' }} onClick={handleSelectButtonClick}>Seleccionar</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                </Row>
            </div>
        </Container>
    );
}

export default OfertaPermuta;