import React, { useContext } from 'react';
import { Context } from '../store/context';

const ListadeIntercambios = () => {
    const { store } = useContext(Context);

    return (
        <div className="container">
            <h1>Tus Productos para Intercambiar</h1>
            <ul>
                {store.productsList.map((product, index) => (
                    <li key={index}>
                        <p>Nombre del Producto: {product.name}</p>
                        <p>Descripción: {product.description}</p>
                        <p>Categoría: {product.category}</p>
                        <p>Precio: {product.price}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ListadeIntercambios