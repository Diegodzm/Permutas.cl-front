import { Context } from "../store/context"
import { useContext, useEffect } from "react"
import { useNavigate, Link} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './allproducts.css'

const Allproducts = () => {
    const { actions, store } = useContext(Context)

    useEffect(() => {
        actions.fetchPublishedProducts()
        console.log(store.publishedProducts)
    }, []);

    const handleCardClick = (product) => {
        actions.setSelectedProduct(product) 
        console.log(product)
       
   
    };

    return (<div className="container mt-5">

        <ul>{store.publishedProducts.map((product, index) =>
            <li className='product_card col-3 border d-inline-flex p-2 mt-4 mx-2 ' key={index}>
                <Button onClick={() => handleCardClick(product)}>
                    <Link to='/oferta_permuta'>
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
                    </Link>
                </Button>


            </li>)}

        </ul>


    </div>)}
    export default Allproducts