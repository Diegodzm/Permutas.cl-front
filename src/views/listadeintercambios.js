 import React, { useContext } from 'react';
import { Context } from '../store/context';

const ListadeIntercambios = () => {
    const { store } = useContext(Context);

    return (
        <div className="container">
            <h1>Tus Intercambios</h1>
            <ul>
                {store.usersList.map((user, index) => (
                    <li key={index}>
                        <p>Email: {user.email}</p>
                        <p>Nombre: {user.firstname} {user.lastname}</p>
                        <p>Dirección: {user.address}, {user.country}</p>
                        <p>Número de teléfono: {user.phonenumber}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ListadeIntercambios;
