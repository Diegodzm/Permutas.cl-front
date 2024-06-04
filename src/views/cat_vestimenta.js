import { useContext, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Context } from "../store/context";
import './cat_vestimenta.css'; 

const CatVestimenta = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getProductsbyCategory(2);
        actions.accessTokenExpired();
        console.log(store.categoryProducts);
    }, []);

    return (
        <div className="container-style">
            <ul className="ul-style">
                {store.categoryProducts.map((products, index) => (
                    <li className="product_card col-3 mb-4" key={index}>
                        <Card className="card-style">
                            <Card.Img className="cardimg" variant="top" src={store.categoryProducts[index].photo} />
                            <Card.Body>
                                <Card.Title className="card-title-style">{store.categoryProducts[index].name}</Card.Title>
                                <Card.Text className="card-text-style">
                                    Descripción: {store.categoryProducts[index].product_info}
                                </Card.Text>
                                <Card.Text className="card-text-style">
                                    Precio: {store.categoryProducts[index].price}
                                </Card.Text>
                                <Button className="button-style bg-success mt-1 mb-2" href="/productreview">
                                    Ver producto
                                </Button>
                            </Card.Body>
                        </Card>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CatVestimenta;
