import { Context } from "../store/context"
import { useContext,useEffect } from "react"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


const CatOtros = () => {
    const { store,actions } = useContext(Context)

    useEffect(() => {
        actions.getProductsbyCategory(6)
        actions.accessTokenExpired()
        console.log(store.categoryProducts)
        
     
    }, []);
  
    return <ul>
    {store.categoryProducts.map((products, index) => (
        <li className='product_card col-3 mb-4' key={index}>
            <Card style={{ width: '100%', backgroundColor: '#ffffff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}>
                <Card.Img className="cardimg" variant="top" src={store.categoryProducts[index].photo} />
                <Card.Body>
                    <Card.Title style={{ fontWeight: "bold", fontSize: "18px", color: '#333' }}>{store.categoryProducts[index].name}</Card.Title>
                    <Card.Text style={{ color: '#666' }}>
                        Descripción: {store.categoryProducts[index].product_info}
                    </Card.Text>
                    <Card.Text style={{ color: '#666' }}>
                        Precio: {store.categoryProducts[index].price}
                    </Card.Text>
                    <Button className="bg-success mt-1 mb-2" href="/productreview" style={{ backgroundColor: '#006400', borderColor: '#006400', color: '#fff' }}>
                        Ver producto
                    </Button>
                </Card.Body>
            </Card>
        </li>
    ))}
</ul>


}


export default CatOtros