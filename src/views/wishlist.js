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
    
    return  <ul>{store.userwishlist.map(( product,index) =>
        <li className='product_card col-3 border d-inline-flex ' key={index}>
            <Button href="/productreview">
                <Card style={{ width: '15 rem', }}>
                    <Card.Img className="cardimg"   variant="top" src={store.userwishlist[index].photo} />
                    <Card.Body>
                        <Card.Title style={{ fontWeight:"bold", fontSize:"25px" }}>{store.userwishlist[index].name}</Card.Title>
                        <Card.Text >
                            Descripcion: {store.userwishlist[index].product_info}
                        </Card.Text>
                        <Card.Text>
                            Precio: {store.userwishlist[index].price}
                        </Card.Text>
                        
                    </Card.Body>
                </Card>
            </Button>


        </li>)}

    </ul>

}
export default Wishlist