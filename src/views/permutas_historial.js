import React, { useContext, useEffect } from 'react';
import { Context } from '../store/context';

const PermutasHistorial = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.fetchUserProducts(); 
    }, []);

    return (
        <div className="container mt-5">
            <h1>Historial de Permutas</h1>
            <ul>
                {store.userProducts.map((producto, index) => (
                    <li key={index}>
                        Nombre del Producto: {producto.name}
                        Precio: {producto.price}
                    
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PermutasHistorial;
