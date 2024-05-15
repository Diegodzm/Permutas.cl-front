import { Context } from "../store/context"
import { useContext, useEffect } from "react"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './allproducts.css'

const Allproducts = () => {
    const { actions, store } = useContext(Context)
    useEffect(() => {
        actions.fetchPublishedProducts()
        console.log(store.publishedProducts)
    }, []);

    return (<div className="container mt-5">

        <ul>{store.publishedProducts.map((products, index) =>
            <li className='product_card col-3 border d-inline-flex ' key={index}>
                <Button href="/productreview">
                    <Card style={{ width: '15 rem', }}>
                        <Card.Img className="cardimg"   variant="top" src={store.publishedProducts[index].photo} />
                        <Card.Body>
                            <Card.Title style={{ fontWeight:"bold", fontSize:"25px" }}>{store.publishedProducts[index].name}</Card.Title>
                            <Card.Text >
                                Descripcion: {store.publishedProducts[index].product_info}
                            </Card.Text>
                            <Card.Text>
                                Precio: {store.publishedProducts[index].price}
                            </Card.Text>
                            
                        </Card.Body>
                    </Card>
                </Button>


            </li>)}

        </ul>


    </div>)}
    export default Allproducts