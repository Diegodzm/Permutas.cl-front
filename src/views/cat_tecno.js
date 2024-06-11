import React, { useContext, useEffect } from 'react';
import { Context } from '../store/context';
import { Container, Row, Col } from 'react-bootstrap';
import ProductCard from '../components/product_card';


const CatTecno = () => {
    const { store,actions } = useContext(Context)
    useEffect(() => {
        actions.getProductsbyCategory(3)
        actions.accessTokenExpired()
        console.log(store.categoryProducts)
        
     
    }, []);
  
   return (
        <Container className="my-4">
          <h1 className='d-flex justify-content-center mt-4 mb-3'>Tecnologia</h1> 
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
    





export default CatTecno