import { Context } from "../store/context"
import { useContext, useEffect } from "react"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Wishlist = () => {
    const { store,actions } = useContext(Context)
    useEffect(() => {
        actions.getProductsbyUser()
        actions.accessTokenExpired()

    }, []);
    

    return  <div>
        asdasdasdasd
        <ul>{store.wishedList.map((products, index) =>
        <li className='product_card col-3 border d-inline-flex ' key={index}>
            <Button href="/productreview">
                <Card style={{ width: '15 rem', }}>
                    <Card.Img className="cardimg"   variant="top" src={store.wishedList[index].photo} />
                    <Card.Body>
                        <Card.Title style={{ fontWeight:"bold", fontSize:"25px" }}>{store.wishedList[index].name}</Card.Title>
                        <Card.Text >
                            Descripcion: {store.wishedList[index].product_info}
                        </Card.Text>
                        <Card.Text>
                            Precio: {store.wishedList[index].price}
                        </Card.Text>
                        
                    </Card.Body>
                </Card>
            </Button>


        </li>)}

    </ul>


    </div>

}
export default Wishlist