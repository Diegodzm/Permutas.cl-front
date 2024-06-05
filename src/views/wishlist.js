import { Context } from "../store/context"
import { useContext, useEffect } from "react"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Wishlist = () => {
    const { store,actions } = useContext(Context)
    useEffect(() => {
        actions.getWishlist()
        actions.accessTokenExpired()
        

    }, []);
    
    return  <ul>{store.userwishlist.map(( product,index) =>{
        return( 
        <li  key={index}>
            <Button>
                <Card >
                    <Card.Img  src={product.photo} />
                    <Card.Body>
                        <Card.Title>{product.name}</Card.Title>
                        <Card.Text >
                            Descripcion: {product.product_info}
                        </Card.Text>
                        <Card.Text>
                            Precio: {product.brand}
                        </Card.Text>
                        
                    </Card.Body>
                </Card>
            </Button>


        </li>)})}

    </ul>

}
export default Wishlist