import React, { useContext, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Context } from '../store/context';
import ProductCard from '../components/product_card';

const CatTecno = () => { const { store, actions } = useContext(Context);

useEffect(() => {
  actions.getProductsbyCategory(3);
  actions.accessTokenExpired();
}, []);

    return (
        <Container>
            <h1 className="my-4">Tecnología</h1>
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

export default CatTecno;





