import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';

const ProductCardWithDelete = ({ product, onDelete }) => {
    const [expanded, setExpanded] = useState(false);
  
    const toggleExpand = () => {
      setExpanded(!expanded);
    };
  
    const handleDeleteClick = () => {
      console.log("Product ID:", product.id); 
      onDelete(product.id);
    };
  
    return (
      <Card style={{ width: '100%', backgroundColor: '#ffffff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}>
        <Card.Img className="cardimg" variant="top" src={product.photo} />
        <Card.Body>
          <Card.Title style={{ fontWeight: "bold", fontSize: "18px", color: '#333' }}>{product.name}</Card.Title>
          {!expanded && (
            <Button variant="success" onClick={toggleExpand}>
              Ver más
            </Button>
          )}
          {expanded && (
            <>
              <Card.Text style={{ color: '#666' }}>Descripción: {product.product_info}</Card.Text>
              <Card.Text style={{ color: '#666' }}>Precio: {product.price}</Card.Text>
              <Button variant="secondary" onClick={toggleExpand}>
                Ver menos
              </Button>
              <Button variant="danger" onClick={handleDeleteClick}>
                Eliminar
              </Button>
            </>
          )}
        </Card.Body>
      </Card>
    );
  };
  

export default ProductCardWithDelete;
