import { Context } from "../store/context"
import { useContext, useEffect } from "react"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const ProductReview = () => {
    const { actions, store } = useContext(Context)

    return (<div className="container mt-5">

        Producto

    </div>


    )

}
export default ProductReview