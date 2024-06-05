import React, { useContext, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Context } from '../store/context';
import ProductCardWithDelete from '../components/product_card_delete';

const UserProducts = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getProductsbyUser();
    actions.accessTokenExpired();
  }, []);

  const handleDelete = async (productId) => {
    await actions.deleteProduct(productId);
    actions.getProductsbyUser(); 
  };

  return (
    <Container>
      <h1 className="my-4">Mis Productos</h1>
      <Row xs={1} md={2} lg={3} className="g-4">
        {store.userProducts.map((product, index) => {
        
          console.log("User Products:", store.userProducts); 
          return (
            <Col key={index}>
             
              <ProductCardWithDelete product={product} onDelete={() => handleDelete(product.id)} />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default UserProducts;

