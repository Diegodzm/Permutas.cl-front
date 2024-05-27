import { Context } from "../store/context"
import { useContext, useEffect } from "react"
import { useNavigate, } from "react-router-dom";
import './allproducts.css'
import { Link } from "react-router-dom";
import { Button, Card, Row, Col, Container } from 'react-bootstrap';

const Allproducts = () => {
    const { actions, store } = useContext(Context)
    useEffect(() => {
        actions.accessTokenExpired()
        actions.fetchPublishedProducts()
        actions.getProductsbyUser()
    }, []);

    const allproducts= store.publishedProducts
    const userproducts= store.userProducts
  
    let productdif = allproducts.filter(a => !userproducts.map(b=>b.user_id).includes(a.user_id))


    const handleCardClick = (product) => {
        actions.setSelectedProduct(product) 
        console.log(store.productIndex)
        const indexProduct=store.publishedProducts.indexOf(product)
        actions.showIndex(indexProduct)
        
    };

    

    return (<div className="container mt-5">

        <ul>{productdif.map((product, index) =>
            <li className='product_card col-3 border d-inline-flex p-2 mt-4 mx-2 ' key={index}>
                   
                    <Card style={{ width: '15 rem', }}>
                        <Card.Img className="cardimg"   variant="top" src={productdif[index].photo} />
                        <Card.Body>
                            <Card.Title style={{ fontWeight:"bold", fontSize:"25px" }}>{productdif[index].name}</Card.Title>
                            <Card.Text >
                                Descripcion: {productdif[index].product_info}
                            </Card.Text>
                            <Card.Text>
                                Precio: {productdif[index].price}
                            </Card.Text>
                            
                        </Card.Body>
                        <Link  to='/oferta_permuta'><Button className="bg-success mt-1 mb-2 " onClick={() => handleCardClick(product)}>Ofertar</Button></Link>
                        <Button className="bg-primary" onClick={()=>actions.addWishedproduct(product)}>Agregar a favoritos</Button>
                    </Card>
                    
                
               


            </li>)}


        </ul>
        


    </div>)}
    export default Allproducts