import { Context } from "../store/context"
import { useContext } from "react"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Categories = () => {
    const { store } = useContext(Context)
   

    return (<div className="container mt-5">

        <ul>{store.categoryProducts.map((index) =>
            <li className='ListaContactos  border d-inline-flex p-2 mt-4 mx-2' key={index}>
                <Button href="/productreview">
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={store.categocryProducts[index].photo} />
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


    </div>


    )

}
export default Categories