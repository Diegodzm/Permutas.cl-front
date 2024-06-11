import React, { useContext, useEffect } from 'react';
import { Context } from '../store/context';
import { Container, Row, Col } from 'react-bootstrap';
import ProductCard from '../components/product_card';

const CatOtros = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getProductsbyCategory(6); 
    actions.accessTokenExpired();
  }, []);

  return (
    <Container className="my-4">
      <h1 className='d-flex justify-content-center mt-4 mb-3'>Otros</h1> 
      <Row xs={1} md={2} lg={3} className="g-4">
        {store.categoryProducts.map((product, index) => (
          <Col key={index}>
            <ProductCard product={product} /> 
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default CatOtros;
