import { Context } from "../store/context"
import { useContext,useEffect } from "react"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const CatElectro = () => {
   
    const { store,actions } = useContext(Context)

    useEffect(() => {
        actions.getProductsbyCategory(1)
        actions.accessTokenExpired()
        console.log(store.categoryProducts)
        
     
    }, []);
  
    return <ul>{store.categoryProducts.map((products, index) =>
        <li className='product_card col-3 border d-inline-flex ' key={index}>
            <Button href="/productreview">
                <Card style={{ width: '15 rem', }}>
                    <Card.Img className="cardimg"   variant="top" src={store.categoryProducts[index].photo} />
                    <Card.Body>
                        <Card.Title style={{ fontWeight:"bold", fontSize:"25px" }}>{store.categoryProducts[index].name}</Card.Title>
                        <Card.Text >
                            Descripcion: {store.categoryProducts[index].product_info}
                        </Card.Text>
                        <Card.Text>
                            Precio: {store.categoryProducts[index].price}
                        </Card.Text>
                        
                    </Card.Body>
                </Card>
            </Button>


        </li>)}

    </ul>
}
export default CatElectro