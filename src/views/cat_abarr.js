import React, { useContext, useEffect } from 'react';
import { Context } from '../store/context';
import { Container, Row, Col } from 'react-bootstrap';
import ProductCard from '../components/product_card'; 

const CatAbarr = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getProductsbyCategory(5);
    actions.accessTokenExpired();
  }, []);

  return (
    <Container className="mt-4">
      <h1 className='d-flex justify-content-center mt-4 mb-3'>Abarrotes</h1>
      <Row xs={1} md={2} lg={3} className="g-4">
        {store.categoryProducts.map((product, index) => (
          <Col key={index}>
            <ProductCard product={product} /> 
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CatAbarr;

